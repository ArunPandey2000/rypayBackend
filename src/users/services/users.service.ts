import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { IAccessTokenUserPayload } from 'src/auth/interfaces/user-token-request-payload.interface';
import { TokenService } from 'src/auth/services/token.service';
import { CardsService } from 'src/cards/services/cards.service';
import { UserDocument } from 'src/core/entities/document.entity';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';
import { generateRef } from 'src/core/utils/hash.util';
import { MerchantClientService } from 'src/integration/busybox/external-system-client/merchant-client.service';
import { WalletService } from 'src/wallet/services/wallet.service';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { UpdateKycDetailUploadDto } from '../dto/user-kyc-upload.dto';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserApiResponseDto, UserResponse } from '../dto/user-response.dto';
import { UserMapper } from '../mapper/user-mapper';
import { UploadFileService } from './updaload-file.service';
import * as bcrypt from 'bcrypt';
import { UserDocumentResponseDto } from '../dto/user-documents.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;
  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
    private walletService: WalletService,
    private merchantClientService: MerchantClientService,
    private cardService: CardsService,
    private _connection: DataSource,
    private uploadFileService: UploadFileService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserDocument) private documentRepository: Repository<UserDocument>,
  ) { }

  async registerUser(userRequestDto: UserRequestDto) {
    const queryRunner = this._connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUser = UserMapper.mapUserRequestDtoToEntity(userRequestDto);

      const userExists = await this.userRepository.findOne({
        where: {
          phoneNumber: userRequestDto.phoneNumber,
        }
      });

      if (userExists) {
        await queryRunner.rollbackTransaction();

        await queryRunner.release();

        throw new ConflictException('User already exists');
      }

      const savedUser = this.userRepository.create(newUser);

      if (!savedUser) {
        await queryRunner.rollbackTransaction();

        await queryRunner.release();

        throw new BadRequestException('User cannot be created');
      }

      await queryRunner.manager.save(savedUser);

      const wallet: Wallet = await this.walletService.createWallet(
        {
          user: savedUser,
          walletAccountNo: await this.walletService.generateWalletAccountNo(),
        },
        queryRunner,
      );
      const cardInfo = await this.merchantClientService.getCustomerStatus(savedUser.phoneNumber);
      const cardDetails = cardInfo.data.card_details;
      const cardDto = {
        user: savedUser,
        cardNumber: cardDetails.cardId,
        status: ''
      };
      const card = await this.cardService.createCardAndAssignKitNumberToUser(cardDto, queryRunner);

      if (!wallet || !card) {
        await queryRunner.rollbackTransaction();

        await queryRunner.release();

        throw new BadRequestException('Wallet creation failed');
      }

      // const user = await this.userRepository.save(newUser);
      await queryRunner.commitTransaction();
      return new UserResponse(savedUser);
    } catch (err) {
      if (queryRunner.isTransactionActive) {
        await queryRunner.rollbackTransaction();
        await queryRunner.release();
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async registerUserAndGenerateToken(
    userRequestDto: UserRequestDto,
  ): Promise<UserApiResponseDto> {
    const orgId = this.configService.get('BUSY_BOX_ORG_ID');
    // const issueCardDto = UserMapper.mapUserRequestDtoToMerchantRegistrationDto(userRequestDto, orgId);
    // const userResponse = await this.merchantClientService.issueCard(issueCardDto);
    // hardcoded untill busybox api's work
    const userResponse = {
      "statusCode": "S0200",
      "status": "SUCCESS",
      "data": {
        "message": "Card creation is in progress",
        "cardHolderId": `221117123231408ID1CUSTID${Math.floor(Math.random() * 10000000)}`
      },
      "sessionId": "YES"
    };
    if (userResponse.status === "SUCCESS") {
      userRequestDto.cardHolderId = userResponse.data.cardHolderId;
      const user = await this.registerUser(userRequestDto);
      const tokenPayload = <IAccessTokenUserPayload>{
        userId: user.userid,
        phoneNumber: user.phoneNumber,
        role: user.userRole,
      };
      const tokens = await this.tokenService.generateTokens(tokenPayload);
      return {
        user,
        tokens,
      };
    }
    throw new InternalServerErrorException("Failed to issue card for the user");
  }

  async registerAdminAndGenerateToken(
    userRequestDto: UserRequestDto,
  ): Promise<UserApiResponseDto> {
    userRequestDto.cardHolderId = `ADMIN_${generateRef(10)}`;
    const user = await this.registerUser(userRequestDto);
    const tokenPayload = <IAccessTokenUserPayload>{
      userId: user.userid,
      phoneNumber: user.phoneNumber,
      role: user.userRole,
    };
    const tokens = await this.tokenService.generateTokens(tokenPayload);
    return {
      user,
      tokens,
    };
  }

  async setPin(userId: string, pin: string): Promise<void> {
    const hashedPin = await bcrypt.hash(pin, this.saltRounds);
    await this.userRepository.update(userId, { pin: hashedPin });
  }

  async verifyPin(userId: string, pin: string): Promise<boolean> {
    const user = await this.userRepository.findOne({where: {id: userId}});
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return bcrypt.compare(pin, user.pin);
  }

  async validateUserCardAssignment(userId: string, otp: string) {
    const user = await this.findUserById(userId);
    const response = await this.merchantClientService.verifyRegistrationOtp({
      otp: otp,
      mobile_number: user.phoneNumber,
      sessionId: 'YES'
    });
    if (response.data.code) {
      // update card data
    }
  }

  async updateUserKycStatus(userId: string, updateKycStatus: keyof typeof KycVerificationStatus) {
    const user = await this.findUserById(userId);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    const isRequiredDocumentsUploaded = user.documents.length && user.documents
      .every((document) => ['AADHAR', 'PAN'].includes(document.documentType));
    if (!isRequiredDocumentsUploaded) {
      throw new BadRequestException('AADHAR or PAN documents not uploaded');
    }
    const updatedStatus = KycVerificationStatus[updateKycStatus];
    user.kycVerificationStatus = updatedStatus;
    try {
      await this.userRepository.save(user);
      return 'User kyc status updated.';
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async handleKycEvent(cardHolderId: string, kycStatus: string) {
    const user = await this.userRepository.findOne({ where: { cardHolderId: cardHolderId } });
    const kycColumnStatus = kycStatus === 'COMPLETED' ? KycVerificationStatus.COMPLETED : KycVerificationStatus.REJECTED;
    user.kycVerificationStatus = kycColumnStatus;
    await this.userRepository.save(user);
  }

  async getUsersByKycStatus(kycStatus: keyof typeof KycVerificationStatus) {
    const kycStatusValue = KycVerificationStatus[kycStatus];
    const users = await this.userRepository.find({
      where: {
        kycVerificationStatus: kycStatusValue
      }
    });
    return users.map((user) => new UserResponse(user));
  }

  findUserById(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }

  async updateUserKycDetails(userId: string, fileInfos: UpdateKycDetailUploadDto[]): Promise<boolean> {

    const userInfo = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!userInfo) {
      throw new NotFoundException(`User not found`);
    }
    const queryRunner = this._connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      for (const fileInfo of fileInfos) {

        const documentInfo = await queryRunner.manager.findOne(UserDocument, {
          where: { user: userInfo, documentType: fileInfo.docType },
        });

        await this.saveDocumentInfo(fileInfo, userInfo, documentInfo, queryRunner.manager);
      }

      await queryRunner.commitTransaction();
      return true;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      if (err instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(err.message);
      } else {
        throw err;
      }
    } finally {
      await queryRunner.release();
    }
  }

  async getUserDocuments(userId: string) {
    const documents = await this.documentRepository.find({where: {user: {id: userId}}});
    if (documents.length) {
      for (const document of documents) {
        document.documentUrl = (await this.uploadFileService.getPresignedSignedUrl(document.documentUrl)).url;
      }
      return documents.map((doc) => new UserDocumentResponseDto(doc));
    }
    return [];
  }

  async saveDocumentInfo(fileInfo: UpdateKycDetailUploadDto, userInfo: User, documentInfo?: UserDocument, entityManager?: EntityManager) {
    if (!entityManager) {
      entityManager = this.documentRepository.manager;
    }

    if (documentInfo) {
      documentInfo.description = fileInfo.description;
      documentInfo.documentUrl = fileInfo.fileKey;
    } else {
      documentInfo = this.documentRepository.create({
        description: fileInfo.description,
        documentUrl: fileInfo.fileKey,
        documentType: fileInfo.docType,
        user: userInfo
      });
    }

    return await entityManager.save(documentInfo);
  }
}

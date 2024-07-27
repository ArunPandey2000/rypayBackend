import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserMapper } from '../mapper/user-mapper';
import { UpdateKycStatusDto } from '../dto/user-kyc-update.dto';
import { UserApiResponseDto, UserResponse } from '../dto/user-response.dto';
import { TokenService } from 'src/auth/services/token.service';
import { IAccessTokenUserPayload } from 'src/auth/interfaces/user-token-request-payload.interface';
import { MerchantClientService } from 'src/integration/busybox/external-system-client/merchant-client.service';
import { ConfigService } from '@nestjs/config';
import { Wallet } from 'src/core/entities/wallet.entity';
import { WalletService } from 'src/wallet/services/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    private tokenService: TokenService,
    private configService: ConfigService,
    private walletService: WalletService,
    private merchantClientService: MerchantClientService,
    private _connection: DataSource,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

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
  
      if (!wallet) {
        await queryRunner.rollbackTransaction();
  
        await queryRunner.release();
  
        throw new BadRequestException('Wallet creation failed');
      }
  

      // const user = await this.userRepository.save(newUser);
      await queryRunner.commitTransaction();
      return new UserResponse(savedUser);
    } catch (err) {
      await queryRunner.rollbackTransaction();
  
      await queryRunner.release();
      throw new InternalServerErrorException(err.message);
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
          "cardHolderId": "221117123231408ID1CUSTID9622352"
      },
      "sessionId": "YES"
    }
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

  async updateUserKycStatus(
    userId: string,
    kycStatus: UpdateKycStatusDto,
  ): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.kycVerificationStatus = kycStatus.verificationStatus;

    try {
      await this.userRepository.save(user);
      return 'User kyc status updated.';
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  updateRefreshToken(userId: string, refreshToken: string) {}

  findUserById(userId: string) {
    return this.userRepository.findOne({ where: { id: userId } });
  }
}

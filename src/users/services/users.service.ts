import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Repository } from 'typeorm';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserMapper } from '../mapper/user-mapper';
import { UpdateKycStatusDto } from '../dto/user-kyc-update.dto';
import { UserApiResponseDto, UserResponse } from '../dto/user-response.dto';
import { TokenService } from 'src/auth/services/token.service';
import { IAccessTokenUserPayload } from 'src/auth/interfaces/user-token-request-payload.interface';

@Injectable()
export class UsersService {
  constructor(
    private tokenService: TokenService,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async registerUser(userRequestDto: UserRequestDto) {
    try {
      const newUser = UserMapper.mapUserRequestDtoToEntity(userRequestDto);
      const user = await this.userRepository.save(newUser);
      return new UserResponse(user);
    } catch (err) {
      throw new InternalServerErrorException(err.message);
    }
  }

  async registerUserAndGenerateToken(
    userRequestDto: UserRequestDto,
  ): Promise<UserApiResponseDto> {
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

import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { OtpFlowService } from 'src/otp-flow/services/otp-flow.service';
import { UserApiResponseDto, UserResponse } from 'src/users/dto/user-response.dto';
import { Repository } from 'typeorm';
import { VerifyPhoneRequestDto } from '../dto/verify-phone-request.dto';
import { OtpRepository } from '../repository/otp.repository';
import { AuthUtil } from '../utils/auth.util';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { sendOtpResponseDto } from '../dto/send-otp-response.dto';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private otpFlowService: OtpFlowService,
    private otpRepository: OtpRepository,
    private configService: ConfigService,
    @InjectRepository(User) private userRepo: Repository<User>) {

    }

  async requestOtp(phoneNumber: string) {
    const otpLength = this.configService.get('OTP_LENGTH');
    const generatedOtp = otpGenerator.generate(otpLength, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    /*
      send SMS message service code comes here
    */
    this.otpFlowService.sendOtp(phoneNumber);
    let otpRecord = this.otpRepository.upsertOtpInfo(phoneNumber, generatedOtp);
    return otpRecord.then(() => {
      return {
        message: 'success'
      } as sendOtpResponseDto;
    }).catch(err => {
      return {
        message: err.message,
      } as sendOtpResponseDto;
    });
  }

  async validateOTP(userPhoneInfo: VerifyPhoneRequestDto) {
    return await this.otpRepository.validateUserOtp(userPhoneInfo.phoneNumber, userPhoneInfo.otp)
    .then(async () => {
        const userData = await this.userRepo.findOne({
            where: {
              phoneNumber: userPhoneInfo.phoneNumber,
            },
            relations: {address: true, merchant: true }
          });
        if (!userData) {
            return <UserApiResponseDto>{
                user: null,
                tokens: null
            }
        }
        const tokenPayload = AuthUtil.getAccessTokenPayloadFromUserModel(userData);
        const tokens = await this.tokenService.generateTokens(tokenPayload);
        return <UserApiResponseDto> {
            user: new UserResponse(userData),
            tokens: tokens
        }
    }).catch(err => {
      if (err instanceof InternalServerErrorException) {
        throw new InternalServerErrorException(err.message)
      }
      throw err;
    });
  }

  async refreshToken(refreshToken: string) {
    return this.tokenService.createAccessTokenFromRefreshToken(refreshToken);
  }

  async revokeToken(userId: string) {
    try {
      return this.tokenService.revokeAccessToken(userId);
    } catch {
      throw new InternalServerErrorException('there is some error in revoking user access');
    }
  }
  
}
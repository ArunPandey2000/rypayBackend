import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { OtpFlowService } from 'src/otp-flow/services/otp-flow.service';
import { UserApiResponseDto, UserResponse } from 'src/users/dto/user-response.dto';
import { Repository } from 'typeorm';
import { sendOtpResponseDto } from '../dto/send-otp-response.dto';
import { VerifyPhoneRequestDto } from '../dto/verify-phone-request.dto';
import { AuthUtil } from '../utils/auth.util';
import { TokenService } from './token.service';
import { Address } from 'src/core/entities/address.entity';

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    private otpFlowService: OtpFlowService,
    @InjectRepository(User) private userRepo: Repository<User>
  ) {}

  async requestOtp(phone: string): Promise<sendOtpResponseDto> {
    try {
        this.otpFlowService.sendOtp(phone);
        return {
            message: "otp sent!!"
        }
    } catch {
        return {
            message: "error in sending otp!!"
        }
    }
  }

  async verifyOtp(verifyOtpDto: VerifyPhoneRequestDto): Promise<UserApiResponseDto> {
    if (verifyOtpDto.otp !== '123456') {
        throw new BadRequestException('invalid otp')
    }
    const userData = await this.userRepo.findOne({
      where: {
        phoneNumber: verifyOtpDto.phone,
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
  }
}
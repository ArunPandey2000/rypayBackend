import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { VerifyPhoneRequestDto } from '../dto/verify-phone-request.dto';
import { sendOtpResponseDto } from '../dto/send-otp-response.dto';
import { UserApiResponseDto } from 'src/users/dto/user-response.dto';
import { sendOtpRequestDto } from '../dto/send-otp-request.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @ApiResponse({type: sendOtpResponseDto})
    @Post('request-otp')
    async requestOtp(@Body() otpRequestDto: sendOtpRequestDto): Promise<sendOtpResponseDto> {
        return this.authService.requestOtp(otpRequestDto.phone);
    }

    @ApiResponse({type: UserApiResponseDto})
    @Post('validate-otp')
    async validateOtp(@Body() verifyPhoneDto: VerifyPhoneRequestDto): Promise<UserApiResponseDto> {
        return this.authService.verifyOtp(verifyPhoneDto);
    }
}

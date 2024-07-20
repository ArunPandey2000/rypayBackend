import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
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
    @HttpCode(HttpStatus.OK)
    @Post('request-otp')
    @ApiBody({
        required: true,
        type: sendOtpRequestDto
    })
    async requestOtp(@Body() userPhone: sendOtpRequestDto) {
        return this.authService.requestOtp(userPhone.phone);
    }

    @ApiResponse({type: UserApiResponseDto})
    @Post('validate-otp')
    @HttpCode(HttpStatus.OK)
    @ApiBody({
        required: true,
        type: VerifyPhoneRequestDto
    })
    async validateOtp(@Body() userPhone: VerifyPhoneRequestDto) {
        return this.authService.validateOTP(userPhone);
    }
}

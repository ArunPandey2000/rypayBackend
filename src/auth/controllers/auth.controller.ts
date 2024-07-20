import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { sendOtpRequestDto } from '../dto/send-otp-request.dto';
import { VerifyPhoneRequestDto } from '../dto/verify-phone-request.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('request-otp')
    @ApiBody({
        required: true,
        type: sendOtpRequestDto
    })
    async verifyPhone(@Body() userPhone: sendOtpRequestDto) {
        return this.authService.requestOtp(userPhone.phone);
    }

    @Post('validate-otp')
    @ApiBody({
        required: true,
        type: VerifyPhoneRequestDto
    })
    async validateOtp(@Body() userPhone: VerifyPhoneRequestDto) {
        return this.authService.validateOTP(userPhone);
    }
}

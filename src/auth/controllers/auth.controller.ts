import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { sendOtpRequestDto } from '../dto/send-otp-request.dto';

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
    async validateOtp(@Body('phone') userPhone: string) {
    }
}

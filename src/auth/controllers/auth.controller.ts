import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }

    @Post('request-otp')
    async verifyPhone(@Body('phone') userPhone: string) {
        this.authService.verifyPhone(userPhone);
    }

    @Post('validate-otp')
    async validateOtp(@Body('phone') userPhone: string) {

    }
}

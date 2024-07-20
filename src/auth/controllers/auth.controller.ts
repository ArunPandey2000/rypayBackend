import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
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

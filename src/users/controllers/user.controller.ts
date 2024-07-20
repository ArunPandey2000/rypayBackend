import { Controller, Post } from '@nestjs/common';

@Controller('user')
export class UsersController {
    @Post('register')
    async registerUser() {
        
    }
}

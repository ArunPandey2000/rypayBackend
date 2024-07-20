import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UsersController {
    @Post('register')
    async registerUser() {

    }
}

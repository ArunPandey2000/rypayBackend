import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserApiResponseDto } from '../dto/user-response.dto';
import { UsersService } from '../services/users.service';

@Controller('user')
@ApiTags('User')
export class UsersController {

    constructor(private userService: UsersService) {

    }

  @ApiOperation({ summary: 'Endpoint to register the user' })
  @Post('/signup')
  @ApiResponse({ status: HttpStatus.CREATED, type: UserApiResponseDto, description: 'The record has been successfully created.'})
  @ApiResponse({ status: HttpStatus.INTERNAL_SERVER_ERROR, description: 'Forbidden.'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request exception'})
  async register(@Body() signUpDto: UserRequestDto): Promise<UserApiResponseDto> {
    return this.userService.registerUserAndGenerateToken(signUpDto);
  }
}

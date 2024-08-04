import { Body, Controller, Get, HttpStatus, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserRequestDto } from '../dto/user-request.dto';
import { UserApiResponseDto, UserResponse } from '../dto/user-response.dto';
import { UsersService } from '../services/users.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Endpoint to register the user' })
  @Post('/signup')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UserApiResponseDto,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request exception',
  })
  async register(
    @Body() signUpDto: UserRequestDto,
  ): Promise<UserApiResponseDto> {
    return this.userService.registerUserAndGenerateToken(signUpDto);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Endpoint to initiate kyc of the user' })
  @Put('/kyc-status')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: 'string',
    description: 'The record has been successfully updated.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request exception',
  })
  async updateKYC(
    @Req() req: any, kycStatus: keyof typeof KycVerificationStatus
  ): Promise<string> {
    return this.userService.updateUserKycStatus(req.user.sub, kycStatus);
  }

  @ApiOperation({ summary: 'Endpoint to get list of users based on kyc status' })
  @Get('/kyc/:kycStatus')
  @ApiParam({name: 'kycStatus', type: 'string'})
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    type: Array<UserResponse>,
    description: 'The list of users based on given kyc status.',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Forbidden.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad request exception',
  })
  async getKYCInitiatedUsers(
    @Param('kycStatus') kycStatus: keyof typeof KycVerificationStatus
  ): Promise<UserResponse[]> {
    return this.userService.getUsersByKycStatus(kycStatus);
  }
}

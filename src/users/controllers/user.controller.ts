import { Body, Controller, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';
import { PinRequestDto } from '../dto/pin-request.dto';
import { UserAdminRequestDto, UserRequestDto } from '../dto/user-request.dto';
import { UserApiResponseDto, UserResponse } from '../dto/user-response.dto';
import { UsersService } from '../services/users.service';
import { UploadFileService } from '../services/updaload-file.service';
import { UpdateKycDetailUploadDto } from '../dto/user-kyc-upload.dto';

@Controller('user')
@ApiTags('User')
export class UsersController {
  constructor(private userService: UsersService, private uploadFileService: UploadFileService) { }

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

  @ApiOperation({ summary: 'Endpoint to register the user as Admin' })
  @Post('/signup/admin')
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
  async registerAdmin(
    @Body() signUpDto: UserAdminRequestDto,
  ): Promise<UserApiResponseDto> {
    return this.userService.registerAdminAndGenerateToken(signUpDto);
  }

  @Post('set-pin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async setPin(
    @Req() req: any,
    @Body() pinRequest: PinRequestDto,
  ): Promise<{ message: string; }> {
    await this.userService.setPin(req.user.sub, pinRequest.pin);
    return {
      message: 'pin created successfully'
    };
  }

  @Post('verify-pin')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  async verifyPin(
    @Req() req: any,
    @Body() pinRequest: PinRequestDto,
  ): Promise<{ valid: boolean; }> {
    const valid = await this.userService.verifyPin(req.user.sub, pinRequest.pin);
    return { valid };
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
  @ApiParam({ name: 'kycStatus', type: 'string' })
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

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to validate otp for card after card creation' })
  @Post('/validate/card')
  async validateCard(@Req() req: any, @Body('otp') otp: string) {
    const cardDetails = await this.userService.validateUserCardAssignment(req.user.sub, otp);
    return {
      isVerified: true
    };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to get my documents' })
  @Get('/documents')
  async getMyDocuments(@Req() req: any) {
    const userDocuments = await this.userService.getUserDocuments(req.user.sub);
    return {
      data: userDocuments
    };
  }

  @Post('/upload/documents')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to upload user documents /n Max size of the file is 1 MB' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg|pdf)' }),
          new MaxFileSizeValidator({
            maxSize: (1024 * 1024 * 1024), // 1MB
            message: 'File is too large. Max file size is 10MB',
          }),
        ],
        fileIsRequired: true,
      }),
    )
    file: Express.Multer.File
  ) {
    const fileData = await this.uploadFileService.uploadSingleFile(file);
    return fileData;
  }

  @Post('/KYC/document')
  @ApiOperation({ summary: 'Update KYC documents for users' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({
    description: 'Array of KYC document update information',
    type: [UpdateKycDetailUploadDto],
  })
  @ApiResponse({ status: 200, description: 'Documents updated successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 500, description: 'Internal Server Error' })
  async updateKYCDocument(
    @Req() req: any,
    @Body() userDocsInfo: UpdateKycDetailUploadDto[]
  ) {
    const fileData = await this.userService.updateUserKycDetails(req.user.sub, userDocsInfo);
    return {
      success: !!fileData
    };
  }
}

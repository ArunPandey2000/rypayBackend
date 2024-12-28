import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class VerifyPhoneRequestDto {
  @ApiProperty()
  @IsMobilePhone('en-IN')
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @Length(6, 6)
  otp: string;

  @ApiProperty()
  @IsOptional()
  fcmToken: string;
}

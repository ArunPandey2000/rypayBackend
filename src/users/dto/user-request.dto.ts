import {
  IsDate,
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  Min,
  Validate,
} from 'class-validator';
import { UserRole } from 'src/core/enum/user-role.enum';
import { MerchantRequestDto } from './merchecnt-request.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class AddressRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  @Length(10, 200)
  address1: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(10, 200)
  address2: string;

  @IsNotEmpty()
  @ApiProperty()
  city: string;

  @IsNotEmpty()
  @ApiProperty()
  state: string;

  @IsNotEmpty()
  @Length(5, 10)
  @ApiProperty()
  pincode: string;
}

export class UserRequestDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'first name' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @IsDateString()
  @ApiProperty()
  dob: string;

  @Validate(AddressRequestDto)
  @ApiProperty()
  address: AddressRequestDto;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsIn([UserRole.MERCHANT, UserRole.USER])
  @ApiProperty()
  userType: UserRole;

  @IsNotEmpty()
  @ApiProperty()
  panNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  aadharNumber: string;

  @IsOptional()
  @ApiProperty()
  @Validate(MerchantRequestDto)
  merchantInfo: MerchantRequestDto;
}
import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  Length,
  Matches,
  Validate
} from 'class-validator';
import { UserRole } from 'src/core/enum/user-role.enum';
import { MerchantRequestDto } from './merchecnt-request.dto';

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

export class UserRequestCommonDto {
  @IsNotEmpty()
  @ApiProperty({ description: 'first name' })
  firstName: string;

  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsNotEmpty()
  @IsIn(['M', 'F'])
  @ApiProperty()
  gender: 'M' | 'F';

  @IsPhoneNumber('IN')
  @IsNotEmpty()
  @ApiProperty()
  phoneNumber: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  dob: string;

  @Validate(AddressRequestDto)
  @ApiProperty()
  @IsNotEmpty()
  address: AddressRequestDto;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsIn([UserRole.MERCHANT, UserRole.USER])
  @ApiProperty()
  userType: UserRole;

  @IsNotEmpty()
  @ApiProperty()
  @Matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/)
  panNumber: string;

  @IsNotEmpty()
  @ApiProperty()
  @Length(12)
  aadharNumber: string;

  @IsOptional()
  @ApiProperty()
  @Validate(MerchantRequestDto)
  merchantInfo: MerchantRequestDto;

  cardHolderId: string
}

export class UserRequestDto extends UserRequestCommonDto {
  @IsIn([UserRole.MERCHANT, UserRole.USER])
  @ApiProperty()
  userType: UserRole;
}

export class UserAdminRequestDto extends UserRequestCommonDto {
  @IsIn([UserRole.ADMIN])
  @ApiProperty()
  userType: UserRole;
}
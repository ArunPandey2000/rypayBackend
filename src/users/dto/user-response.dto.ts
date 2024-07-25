import { ApiProperty } from '@nestjs/swagger';
import { TokenResponse } from 'src/auth/dto/token-response.dto';
import { Address } from 'src/core/entities/address.entity';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';

export class UserResponse {
  @ApiProperty()
  userid: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  dob: string;

  @ApiProperty()
  userRole: string;

  @ApiProperty()
  address: Address;

  @ApiProperty()
  email: string;

  @ApiProperty()
  wallet: Wallet;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  kycVerificationStatus: KycVerificationStatus;
  constructor(user: User) {
    this.userid = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.dob = user.dob;
    this.userRole = user.role;
    this.address = user.address;
    this.phoneNumber = user.phoneNumber;
    this.wallet = user.wallet;
  }
}

export class AddressDto {}

export class UserApiResponseDto {
  @ApiProperty()
  user: UserResponse;
  @ApiProperty()
  tokens: TokenResponse;
}

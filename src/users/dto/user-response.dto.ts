import { ApiProperty } from '@nestjs/swagger';
import { TokenResponse } from 'src/auth/dto/token-response.dto';
import { Address } from 'src/core/entities/address.entity';
import { Card } from 'src/core/entities/card.entity';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';

export class CardResponse {
  @ApiProperty()
  cardId: string;
  @ApiProperty()
  lastFourDigit: string;
  @ApiProperty()
  status: string;

  constructor(card: Card) {
    if (card) {
      this.cardId = card.cardNumber;
      this.status = card.status;
      this.lastFourDigit = card.lastFourDigits;
    }
  }
}
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
  kycVerificationStatus: string;

  @ApiProperty()
  isPinCreated: boolean;

  @ApiProperty()
  cardDetails: CardResponse;

  constructor(user: User) {
    this.userid = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.dob = user.dob;
    this.userRole = user.role;
    this.address = user.address;
    this.phoneNumber = user.phoneNumber;
    this.kycVerificationStatus = KycVerificationStatus[user.kycVerificationStatus].toString();
    this.isPinCreated = !!user.pin;
    this.cardDetails = new CardResponse(user.card);
  }
}

export class AddressDto {}

export class UserApiResponseDto {
  @ApiProperty()
  user: UserResponse;
  @ApiProperty()
  tokens: TokenResponse;
}

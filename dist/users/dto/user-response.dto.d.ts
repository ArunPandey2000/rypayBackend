import { TokenResponse } from 'src/auth/dto/token-response.dto';
import { Address } from 'src/core/entities/address.entity';
import { Card } from 'src/core/entities/card.entity';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
export declare class CardResponse {
    cardId: string;
    lastFourDigit: string;
    status: string;
    constructor(card: Card);
}
export declare class AccountResponse {
    accountNumber: string;
    ifscCode: string;
    nameInBank: string;
    upi: string;
    constructor(user: User);
}
export declare class UserResponse {
    userid: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    isBlocked: boolean;
    dob: string;
    userRole: string;
    address: Address;
    email: string;
    wallet: Wallet;
    userName: string;
    kycVerificationStatus: string;
    isPinCreated: boolean;
    cardDetails: CardResponse;
    profileUrl: String;
    aadharNumber: String;
    panNumber: String;
    referrelCode: String;
    accountDetails: AccountResponse;
    constructor(user: User);
}
export declare class AddressDto {
}
export declare class UserApiResponseDto {
    user: UserResponse;
    tokens: TokenResponse;
}

import { Address } from "src/core/entities/address.entity";
import { User } from "src/core/entities/user.entity";
import { Wallet } from "src/core/entities/wallet.entity";
import { KycVerificationStatus } from "src/core/enum/kyc-verification-status.enum";

export class UserResponse {
    id: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    dob: string;
    userRole: string;
    address: Address;
    email: string;
    wallet: Wallet;
    walletBalance: number;
    userName: string;
    kycVerificationStatus: KycVerificationStatus;
    constructor(user: User) {
      this.id = user.id;
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

export class AddressDto {
    
}
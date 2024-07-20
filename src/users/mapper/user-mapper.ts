import { User } from "src/core/entities/user.entity";
import { UserRequestDto } from "../dto/user-request.dto";
import { Address } from "src/core/entities/address.entity";
import { KycVerificationStatus } from "src/core/enum/kyc-verification-status.enum";
import { Merchant } from "src/core/entities/merchant.entity";
import { Wallet } from "src/core/entities/wallet.entity";

export class UserMapper {
    static mapUserRequestDtoToEntity(userRequestDto: UserRequestDto) {
        const user = new User();
        if (userRequestDto.address) {
            const address = new Address();
            const { address1, address2, city, state, pincode} = userRequestDto.address;
            address.address1 = address1;
            address.address2 = address2;
            address.city = city;
            address.state = state;
            address.pincode = pincode
            user.address = address;
        }
        user.dob = userRequestDto.dob;
        user.phoneNumber = userRequestDto.phoneNumber;
        user.email = userRequestDto.email;
        user.firstName = userRequestDto.firstName;
        user.lastName = userRequestDto.lastName;
        user.role = userRequestDto.userType;
        user.aadharNumber = userRequestDto.aadharNumber;
        user.panNumber = userRequestDto.panNumber;
        user.kycVerificationStatus = KycVerificationStatus.NOT_INITIATED;
        if (userRequestDto.merchantInfo) {
            const merchantDetails = new Merchant();
            merchantDetails.shopName = userRequestDto.merchantInfo.shopName;
            merchantDetails.gstNumber = userRequestDto.merchantInfo.gstNumber;
            merchantDetails.msmeNumber = userRequestDto.merchantInfo.msmeNumber;
            user.merchant = merchantDetails;
        }
        user.wallet = new Wallet();
        return user;
    }
}
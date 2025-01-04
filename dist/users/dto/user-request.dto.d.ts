import { UserRole } from 'src/core/enum/user-role.enum';
import { MerchantRequestDto } from './merchecnt-request.dto';
export declare class AddressRequestDto {
    address1: string;
    address2: string;
    city: string;
    state: string;
    pincode: string;
}
export declare class UserRequestCommonDto {
    firstName: string;
    lastName: string;
    gender: 'M' | 'F';
    phoneNumber: string;
    dob: string;
    address: AddressRequestDto;
    email: string;
    userType: UserRole;
    panNumber: string;
    aadharNumber: string;
    merchantInfo: MerchantRequestDto;
    cardHolderId: string;
    userSession: string;
}
export declare class UserRequestDto extends UserRequestCommonDto {
    userType: UserRole;
}
export declare class UserAdminRequestDto extends UserRequestCommonDto {
    userType: UserRole;
}
export declare class UserUpdateRequestDto extends UserRequestCommonDto {
    userType: UserRole;
    isBlocked: boolean;
}
export declare class UserUpdateResponse {
    success: boolean;
}
export declare class ValidateOTPAfterCardCreationDTO {
    otp: string;
}

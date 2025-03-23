import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';
import { PinRequestDto, UpdateForgotPin } from '../dto/pin-request.dto';
import { UpdateKycDetailUploadDto } from '../dto/user-kyc-upload.dto';
import { UserAdminRequestDto, UserRequestDto, UserUpdateRequestDto, ValidateOTPAfterCardCreationDTO } from '../dto/user-request.dto';
import { UserApiResponseDto, UserResponse } from '../dto/user-response.dto';
import { UploadFileService } from '../services/updaload-file.service';
import { UsersService } from '../services/users.service';
import { KycVerificationStatusResponse } from '../dto/kyc-status.dto';
import { PhoneNumberExists } from '../dto/phone-number-exists.dto';
import { User } from 'src/core/entities/user.entity';
import { ValidateAadharDto } from '../dto/validate-aadhar.dto';
export declare class UsersController {
    private userService;
    private uploadFileService;
    constructor(userService: UsersService, uploadFileService: UploadFileService);
    register(signUpDto: UserRequestDto): Promise<UserApiResponseDto>;
    requestAadharOtp(aadharNumber: string): Promise<any>;
    validateAadharOtp(body: ValidateAadharDto): Promise<string>;
    deleteUser(req: any): Promise<string>;
    registerAdmin(signUpDto: UserAdminRequestDto): Promise<UserApiResponseDto>;
    updateUser(userId: string, updateDto: UserUpdateRequestDto): Promise<User>;
    getAllUser(req: any): Promise<UserResponse[]>;
    checkUserExist(phoneNumber: string): Promise<PhoneNumberExists>;
    updateProfileIcon(file: Express.Multer.File, req: any): Promise<{
        message: string;
        fileUrl: string;
    }>;
    updateStaticQR(userId: string, file: Express.Multer.File): Promise<{
        message: string;
        fileUrl: string;
    }>;
    setPin(req: any, pinRequest: PinRequestDto): Promise<{
        message: string;
    }>;
    verifyPin(req: any, pinRequest: PinRequestDto): Promise<{
        valid: boolean;
    }>;
    requestResetPin(req: any): Promise<{
        message: string;
    }>;
    updateForgotPin(req: any, body: UpdateForgotPin): Promise<{
        message: string;
    }>;
    updateKYC(req: any, kycStatus: keyof typeof KycVerificationStatus): Promise<string>;
    getKYCInitiatedUsers(kycStatus: keyof typeof KycVerificationStatus): Promise<UserResponse[]>;
    getKycStatusOfUser(req: any): Promise<KycVerificationStatusResponse>;
    validateCard(req: any, otpRequest: ValidateOTPAfterCardCreationDTO): Promise<{
        isVerified: boolean;
        cardDetails: import("../../core/entities/card.entity").Card;
    }>;
    getMyDocuments(req: any): Promise<{
        data: {};
    }>;
    uploadFile(file: Express.Multer.File): Promise<{
        url: string;
        key: string;
    }>;
    getUserProfile(userId: string): Promise<User>;
    updateKYCDocument(req: any, userDocsInfo: UpdateKycDetailUploadDto[]): Promise<{
        success: boolean;
    }>;
}

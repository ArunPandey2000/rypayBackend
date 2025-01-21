import { OtpInfo } from 'src/core/entities/otp-info.entity';
import { Repository } from 'typeorm';
export declare class OtpRepository {
    private otpRepo;
    constructor(otpRepo: Repository<OtpInfo>);
    upsertOtpInfo(phoneNumber: string, otp: string): Promise<OtpInfo>;
    validateUserOtp(phoneNumber: string, otp: string): Promise<{
        message: string;
    }>;
    updateOTPUsedRecord(record: OtpInfo): Promise<OtpInfo>;
    findByPhoneNumber(phoneNumber: string): Promise<OtpInfo>;
    isTimePassedOut(date: Date): boolean;
}

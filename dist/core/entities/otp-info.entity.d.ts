export declare class OtpInfo {
    id: number;
    phoneNumber: string;
    otpValue: string;
    generatedTime: Date;
    expiryTime: Date;
    isUsed: boolean;
    setExpireTime(): void;
}

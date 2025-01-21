interface OtpVerificationDto {
    mobile_number: string;
    sessionId: string;
    otp: string;
}
interface OtpVerificationResponse {
    statusCode: string;
    message: string;
    data: {
        mobileNumber: string;
        name: string;
        code: string;
        fullKYCCompleted: boolean;
        kycCompleted: boolean;
        docUploaded: boolean;
    };
}

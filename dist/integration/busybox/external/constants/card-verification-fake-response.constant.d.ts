export declare const getFakeCardVerificationResponse: () => {
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
};

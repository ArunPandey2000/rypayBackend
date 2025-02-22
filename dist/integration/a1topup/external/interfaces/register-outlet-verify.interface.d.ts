export interface RegisterOutletOtpRequestModel {
    outletMobile: string;
    aadhaarNumber: string;
    otp: string;
    latitude: string;
    longitude: string;
}
interface OutletData {
    status: string;
}
export interface OtpVerificationResponse {
    orderId: string;
    status: string;
    outletData: OutletData;
    resText: string;
    pointUsed: string;
    resCode: string;
}
export {};

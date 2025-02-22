interface OutletData {
    otpStatus: string;
}
export interface RegisterOutletResponseData {
    orderId: string;
    status: string;
    outletData: OutletData;
    resText: string;
    pointUsed: string;
    resCode: string;
}
export {};

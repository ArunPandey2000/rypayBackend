export interface OutletLoginRequestModel {
    outletMobile: string;
    agentAadhaar: string;
    latitude: string;
    longitude: string;
    authType: string;
    deviceResponse: string;
}
export interface OutletLoginResponseModel {
    orderId: string;
    status: string;
    outletData: {
        status: string;
        transSessionId: string;
    };
    resText: string;
    pointUsed: string;
    resCode: string;
}

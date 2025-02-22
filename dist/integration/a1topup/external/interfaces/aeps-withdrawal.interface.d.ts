export interface AEPSWithdrawalRequestModel {
    operatorId: string;
    amount: string;
    mobile: string;
    urid: string;
    outletMobile: string;
    agentAadhaar: string;
    deviceResponse: string;
    bankId: string;
    aadhaarNumber: string;
    customerMobile: string;
    latitude: string;
    longitude: string;
}
export interface AEPSWithdrawalResponseModel {
    data: {
        orderId: string;
        status: string;
        mobile: string;
        amount: string;
        transId: string;
        resCode: string;
        p2pBuyerBal: string;
        p2aBuyerBal: string;
        totalBuyerBal: string;
        creditUsed: string;
        beneficiaryName: string;
        resText: string;
    };
}

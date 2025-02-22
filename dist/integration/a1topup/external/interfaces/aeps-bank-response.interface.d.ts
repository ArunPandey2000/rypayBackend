interface AEPSBank {
    bankId: string;
    bankName: string;
    bankShortName: string;
    neft: string;
    rtgs: string;
    imps: string;
    aeps: string;
}
export interface AEPSBankListResponse {
    orderId: string;
    status: string;
    bankList: AEPSBank[];
    resText: string;
    resCode: string;
}
export {};

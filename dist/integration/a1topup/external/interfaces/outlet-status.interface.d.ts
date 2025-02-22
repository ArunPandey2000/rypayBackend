export interface OutletStatusRequestModel {
    outletMobile: string;
    aadhaarNumber: string;
}
interface OutletStatusData {
    status: string;
}
export interface OutletStatusResponse {
    orderId: string;
    status: string;
    outletData: OutletStatusData;
    resText: string;
    pointUsed: string;
    resCode: string;
}
export {};

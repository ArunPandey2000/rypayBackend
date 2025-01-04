export interface IBillData {
    billFetchStatus: string;
    billAmount: string | null;
    billName: string | null;
    billNumber: string | null;
    dueDate: string | null;
    billPeriod: string | null;
    billerBalance: string | null;
    billRemark: string | null;
    bbpsName: string;
    exactness: string;
    resText: string;
}
export interface IFetchBillResponse {
    orderId: string;
    status: string;
    billData: IBillData;
    resText: string;
    pointUsed: string;
    resCode: string;
}

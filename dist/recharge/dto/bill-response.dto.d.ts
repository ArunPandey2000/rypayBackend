import { IBillData } from "src/integration/a1topup/external/interfaces/fetch-bill-response.interface";
export declare class FetchBillResponse {
    billAmount: string;
    dueDate: string;
    remarks: string;
    customerName: string;
    billNumber: string;
    providerName: string;
    billPeriod: string;
    billName: string;
    message: string;
    constructor(billResponse: IBillData);
}

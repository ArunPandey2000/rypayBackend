

export interface IBillData {
    billFetchStatus: string;   // "SUCCESS" or "FAILED"
    billAmount: string | null; // The amount of the bill, nullable
    billName: string | null;   // Name associated with the bill, nullable
    billNumber: string | null; // Bill number, nullable
    dueDate: string | null;    // Due date of the bill, nullable
    billPeriod: string | null; // Billing period, nullable
    billerBalance: string | null; // Biller balance, nullable
    billRemark: string | null;    // Remarks associated with the bill, nullable
    bbpsName: string;          // Name of the BBPS (Bharat Bill Payment System)
    exactness: string;         // The exactness of the bill amount
    resText: string;           // Response text or message
}

export interface IFetchBillResponse {
    orderId: string;   // Order ID, e.g., "24081019551587384"
    status: string;    // Status of the order, e.g., "FAILED"
    billData: IBillData; // Object containing bill-related data
    resText: string;   // General response text, e.g., "Mobile number required"
    pointUsed: string; // Points used in the transaction, might be an empty string
    resCode: string;   // Response code, might be an empty string
}

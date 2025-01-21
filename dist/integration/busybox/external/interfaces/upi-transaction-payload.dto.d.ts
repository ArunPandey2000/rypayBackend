export declare enum PaymentStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    PENDING = "PENDING"
}
export declare enum PaymentType {
    Credit = "Credit",
    Debit = "Debit"
}
export declare class TransactionDataDto {
    transcation_id: string;
    reference_id: string;
    order_id: string;
    account_number: string;
    ifsc: string;
    upi: string;
    amount: number;
    payment_mode: string;
    payment_remark: string;
    statusDescription: string;
    status: PaymentStatus;
    utr: string;
    holderName: string;
    type: PaymentType;
    charge: number;
    gst: number;
    createdAt: string;
    updatedAt: string;
}
export declare class TransactionDto {
    status: boolean;
    statusCode: number;
    data: TransactionDataDto;
    message: string;
    event: string;
}

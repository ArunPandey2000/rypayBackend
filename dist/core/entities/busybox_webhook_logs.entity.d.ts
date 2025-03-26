export declare enum Webhook_Type {
    KYC_EVENT = "KYC_EVENT",
    TRANSACTION = "TRANSACTION",
    UPI = "UPI",
    DEBIT = "DEBIT",
    Payout = "PAYOUT",
    QRPayment = "QR_Payment"
}
export declare class BusyBoxWebhookResponse {
    id: string;
    type: string;
    additionalData: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}

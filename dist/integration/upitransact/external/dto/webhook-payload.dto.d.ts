declare class PaymentDataDto {
    paymentType: string;
    amount: string;
    orderId: string;
    successDate: string;
    UTR: string;
    payerName: string;
    payeeUPI: string;
}
export declare class WebhookPaymentRequestDto {
    status: boolean;
    statusCode: number;
    txnStatus: string;
    msg: string;
    data?: PaymentDataDto;
}
export {};

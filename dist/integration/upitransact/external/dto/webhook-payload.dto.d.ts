declare class PaymentDataDto {
    paymentType: string;
    amount: string;
    mid: string;
    merchantReferenceId: string;
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

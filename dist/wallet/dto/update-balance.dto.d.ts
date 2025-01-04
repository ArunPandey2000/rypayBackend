export declare class UpdateBalanceDto {
    amount: number;
    phone: string;
    txnDescription: string;
}
export declare class initiatePaymentDto {
    amount: number;
    userId: string;
    wallet_id: string;
    transactionDescription: string;
    mobile: string;
    name: string;
    address: string;
    city: string;
    email: string;
    state: string;
}
export declare class paymentCallbackDto {
    response: any;
}

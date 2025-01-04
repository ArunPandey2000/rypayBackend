export declare class RechargeTransactionPayloadDto {
    status: 'SUCCESS' | 'FAILED' | 'DISPUTED' | 'PENDING';
    orderId: string;
    urid: string;
    transId: string;
    creditused: string;
}

export declare class SettlementHistoryDTO {
    date: string;
    totalAmountSettled: number;
    status: string;
    bankReferenceNumber: string;
    UTR: string;
}
export declare class TransactionHistoryDTO {
    date: string;
    amount: number;
    status: string;
    merchantId: string;
    UTR: string;
}
export declare class MergedDataResponseDTO {
    todayTotalCollection: number;
    todayTotalSettlementForTomorrow: number;
    todayTotalPayments: number;
    settlementHistory: SettlementHistoryDTO[];
}

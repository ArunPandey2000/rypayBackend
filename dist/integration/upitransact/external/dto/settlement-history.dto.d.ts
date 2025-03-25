export declare class SettlementHistoryDTO {
    date: string;
    totalAmountSettled: number;
    status: string;
    bankReferenceNumber: string;
    UTR: string;
}
export declare class MergedDataResponseDTO {
    todayTotalCollection: number;
    todayTotalSettlementForTomorrow: number;
    settlementHistory: SettlementHistoryDTO[];
}

import { SORT_DIRECTIONS } from "../enum/sort-direction.enum";
import { TransactionType } from "../enum/transaction-type.enum";
export declare class PaginationRequestDto {
    page: number;
    pageSize: number;
}
export declare class TransactionQueryDto {
    pagination: PaginationRequestDto;
    fromDate: string;
    toDate: string;
    search: string;
    sortDirection: SORT_DIRECTIONS;
    transactionType: TransactionType;
}
export declare class PrintableTransactionQueryDto {
    pagination: PaginationRequestDto;
    fromDate: string;
    toDate: string;
    search: string;
    sortDirection: SORT_DIRECTIONS;
    transactionType: TransactionType;
}

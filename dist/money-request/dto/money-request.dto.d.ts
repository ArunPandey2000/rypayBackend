import { MoneyRequest } from "src/core/entities/money-request.entity";
import { PaginationRequestDto } from "src/transactions/dto/get-transactions.dto";
import { SORT_DIRECTIONS } from "src/transactions/enum/sort-direction.enum";
import { MoneyRequestStatuses } from "../constants/account-details.constant";
export declare class MoneyRequestResponseDto {
    isSuccess: boolean;
}
export declare class MoneyRequestQueryDto {
    pagination: PaginationRequestDto;
    fromDate: string;
    toDate: string;
    search: string;
    sortDirection: SORT_DIRECTIONS;
    status: MoneyRequestStatuses;
}
export declare class MoneyRequestDto {
    paidAt: Date;
    modeOfPayment: string;
    UTR: string;
    paidAmount: number;
    status: 'Requested' | 'Rejected' | 'Paid';
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    profile: any;
    constructor(data: MoneyRequest);
}

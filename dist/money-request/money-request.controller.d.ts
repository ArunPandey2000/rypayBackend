import { MoneyRequestService } from './money-request.service';
import { CreateMoneyRequestDto } from './dto/create-money-request.dto';
import { AccountDetails } from './dto/account-details.dto';
import { MoneyRequestDto, MoneyRequestQueryDto } from './dto/money-request.dto';
import { MoneyRequestStatuses } from './constants/account-details.constant';
export declare class MoneyRequestController {
    private readonly moneyRequestService;
    constructor(moneyRequestService: MoneyRequestService);
    create(req: any, createMoneyRequestDto: CreateMoneyRequestDto): Promise<{
        isSuccess: boolean;
    }>;
    findAll(moneyRequestQuery: MoneyRequestQueryDto): Promise<{
        data: any[];
        pagination: {
            page: number;
            pageSize: number;
            totalRecords: number;
            pageCount: number;
            hasPreviousPage: boolean;
            hasNextPage: boolean;
        };
    }>;
    getAccountDetails(): AccountDetails[];
    findOne(id: string): Promise<MoneyRequestDto>;
    completeMoneyRequest(id: string, status: MoneyRequestStatuses): Promise<{
        success: boolean;
    }>;
}

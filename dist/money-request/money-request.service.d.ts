import { CreateMoneyRequestDto } from './dto/create-money-request.dto';
import { MoneyRequestStatuses } from './constants/account-details.constant';
import { MoneyRequest } from 'src/core/entities/money-request.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { MoneyRequestDto, MoneyRequestQueryDto } from './dto/money-request.dto';
export declare class MoneyRequestService {
    private moneyRequestRepo;
    private userRepo;
    constructor(moneyRequestRepo: Repository<MoneyRequest>, userRepo: Repository<User>);
    create(userId: string, createMoneyRequestDto: CreateMoneyRequestDto): Promise<{
        isSuccess: boolean;
    }>;
    findAll(queryDto: MoneyRequestQueryDto): Promise<{
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
    getAccountDetails(): import("./dto/account-details.dto").AccountDetails[];
    findOne(id: number): Promise<MoneyRequestDto>;
    updateRequest(id: number, status: MoneyRequestStatuses): Promise<{
        success: boolean;
    }>;
    remove(id: number): string;
}

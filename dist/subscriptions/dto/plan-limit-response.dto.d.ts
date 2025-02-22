import { PlanLimit } from 'src/core/entities/plan-limit.entity';
export declare class PlanLimitResponseDto {
    transactionType: string;
    perTransactionLimit: number | null;
    dailyLimit: number;
    monthlyLimit: number;
    constructor(planLimit: PlanLimit);
}

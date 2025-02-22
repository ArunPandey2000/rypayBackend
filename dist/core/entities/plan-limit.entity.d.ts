import { Plan } from './plans.entity';
export declare class PlanLimit {
    id: string;
    plan: Plan;
    transactionType: string;
    perTransactionLimit: number;
    dailyLimit: number;
    monthlyLimit: number;
    createdAt: Date;
    updatedAt: Date;
}

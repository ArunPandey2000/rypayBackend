import { Plan } from 'src/core/entities/plans.entity';
import { Subscription } from 'src/core/entities/subscriptions.entity';
import { Transaction } from 'src/core/entities/transactions.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { Repository } from 'typeorm';
import { PlanResponseDto } from './dto/plan-response.dto';
export declare class SubscriptionsService {
    private subscriptionRepository;
    private planRepository;
    private walletRepository;
    private transactionRepository;
    constructor(subscriptionRepository: Repository<Subscription>, planRepository: Repository<Plan>, walletRepository: Repository<Wallet>, transactionRepository: Repository<Transaction>);
    findAllWithLimits(): Promise<PlanResponseDto[]>;
    findOneWithLimits(id: string): Promise<PlanResponseDto>;
    calculateUpgradeCost(userId: string, newPlanId: string): Promise<{
        currentPlanId: string;
        currentPlan: string;
        newPlan: string;
        newPlanId: string;
        refundAmount: number;
        newPlanCost: number;
        adjustedAmountToPay: number;
        walletBalance: number;
        amountToPayFromWallet: number;
    }>;
    upgradePlan(userId: string, newPlanId: string): Promise<{
        message: string;
        newPlan: string;
        amountDeducted: number;
        remainingWalletBalance: number;
    }>;
}

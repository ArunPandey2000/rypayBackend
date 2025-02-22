import { SubscriptionsService } from './subscriptions.service';
import { PlanResponseDto } from './dto/plan-response.dto';
export declare class SubscriptionsController {
    private readonly subscriptionsService;
    constructor(subscriptionsService: SubscriptionsService);
    getAllPlansWithLimits(): Promise<PlanResponseDto[]>;
    getPlanWithLimits(id: string): Promise<PlanResponseDto>;
    getUpgradeCost(req: any, body: {
        newPlan: string;
    }): Promise<{
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
    confirmUpgrade(body: {
        userId: string;
        newPlan: string;
    }): Promise<{
        message: string;
        newPlan: string;
        amountDeducted: number;
        remainingWalletBalance: number;
    }>;
}

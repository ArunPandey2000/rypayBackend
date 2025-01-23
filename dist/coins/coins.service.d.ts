import { CoinTransaction } from "src/core/entities/coins.entity";
import { Repository } from "typeorm";
import { CoinsDto, RedemptionRuleDto } from "./dto/redemption-rules.dto";
import { User } from "src/core/entities/user.entity";
import { RedemptionRule } from "src/core/entities/redemption-rules.entity";
import { WalletBridge } from "src/wallet/services/wallet.queue";
export declare class CoinTransactionService {
    private readonly coinTransactionRepository;
    private readonly redemptionRuleRepository;
    private readonly userRepository;
    private walletBridge;
    constructor(coinTransactionRepository: Repository<CoinTransaction>, redemptionRuleRepository: Repository<RedemptionRule>, userRepository: Repository<User>, walletBridge: WalletBridge);
    addCoins(userId: string, coinAmount: number, mainWalletTransactionId: string): Promise<void>;
    private getTotalUnexpiredCoins;
    getTransactions(userId: string): Promise<CoinTransaction[]>;
    private validateYearRedemption;
    private getMonthlyRedemptionValue;
    private validateMonthlyRedemption;
    getCoins(userId: string): Promise<CoinsDto>;
    redeemCoins(userId: string, redemptionId: string): Promise<{
        message: string;
        redemptionValue: number;
    }>;
    private deductCoins;
    getRedemptionRules(): Promise<RedemptionRuleDto[]>;
}

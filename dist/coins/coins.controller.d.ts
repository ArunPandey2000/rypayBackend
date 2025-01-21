import { CoinsDto, RedemptionRuleDto } from './dto/redemption-rules.dto';
import { CoinTransactionService } from './coins.service';
import { AddCoinDto } from './dto/add-coin.dto';
export declare class CoinsController {
    private coinsService;
    constructor(coinsService: CoinTransactionService);
    getRedemptionOptions(): Promise<RedemptionRuleDto[]>;
    getCoins(req: any): Promise<CoinsDto>;
    addCoins(req: any, body: AddCoinDto): Promise<string>;
    redeemCoins(req: any, redemptionId: string): Promise<{
        message: string;
        redemptionValue: number;
    }>;
}

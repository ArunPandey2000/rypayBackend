import { Logger } from 'nestjs-pino';
import { WalletService } from 'src/wallet/services/wallet.service';
import { RechargeTransactionPayloadDto } from '../dto/recharge-callback.dto';
import { WebhookResponse } from 'src/core/entities/webhook.entity';
import { DeepPartial, Repository } from 'typeorm';
export declare class RechargeExternalController {
    private logger;
    private webhookRepo;
    private walletService;
    constructor(logger: Logger, webhookRepo: Repository<WebhookResponse>, walletService: WalletService);
    handleTransactions(body: RechargeTransactionPayloadDto): Promise<void>;
    getWebHookData(body: RechargeTransactionPayloadDto): DeepPartial<WebhookResponse>;
}

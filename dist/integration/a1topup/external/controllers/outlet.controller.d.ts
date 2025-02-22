import { Logger } from 'nestjs-pino';
import { WebhookResponse } from 'src/core/entities/webhook.entity';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { RechargeTransactionPayloadDto } from '../dto/recharge-callback.dto';
export declare class OutletController {
    private logger;
    private webhookRepo;
    private walletService;
    constructor(logger: Logger, webhookRepo: Repository<WebhookResponse>, walletService: WalletService);
    getAEPSBankList(body: RechargeTransactionPayloadDto): Promise<void>;
}

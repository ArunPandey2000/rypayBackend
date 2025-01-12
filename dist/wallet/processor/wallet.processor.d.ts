import { Job } from 'bull';
import { WalletService } from '../services/wallet.service';
export declare class WalletProcessor {
    private readonly walletService;
    constructor(walletService: WalletService);
    handleRechargeNotification(job: Job): Promise<void>;
}

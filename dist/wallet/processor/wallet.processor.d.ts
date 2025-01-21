import { Job } from 'bull';
import { WalletService } from '../services/wallet.service';
export declare class WalletProcessor {
    private readonly walletService;
    constructor(walletService: WalletService);
    handleReferrel(job: Job): Promise<void>;
    handleRedemption(job: Job): Promise<void>;
}

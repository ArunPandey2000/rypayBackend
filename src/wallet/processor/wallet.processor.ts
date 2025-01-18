import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { WalletService } from '../services/wallet.service';
import { CoinTransaction } from 'src/core/entities/coins.entity';

@Processor('wallet')
export class WalletProcessor {
  constructor(private readonly walletService: WalletService) {}

  @Process('referrel')
  async handleReferrel(job: Job) {
    const data = job.data;
    this.walletService.handleReferrelBonus(data.referrer, data.refree);
  }

  @Process('redeem')
  async handleRedemption(job: Job) {
    const data = job.data as CoinTransaction;
    this.walletService.handleCoinRedeem(data);
  }
}
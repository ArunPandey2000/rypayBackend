import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { WalletService } from '../services/wallet.service';

@Processor('wallet')
export class WalletProcessor {
  constructor(private readonly walletService: WalletService) {}

  @Process('referrel')
  async handleRechargeNotification(job: Job) {
    const data = job.data;
    this.walletService.handleReferrelBonus(data.referrer, data.refree);
  }
}
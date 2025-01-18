import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CoinTransaction } from 'src/core/entities/coins.entity';
import { NotificationBridge } from 'src/notifications/services/notification-bridge';

@Injectable()
export class CoinCronService {
  private readonly logger = new Logger(CoinCronService.name);

  constructor(
    @InjectRepository(CoinTransaction)
    private readonly coinTransactionRepository: Repository<CoinTransaction>,
    private notificationBridge: NotificationBridge
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async expireOldCoins() {
    const currentDate = new Date();
    const expirationDate = new Date();
    expirationDate.setFullYear(currentDate.getFullYear() - 1); // 12 months ago

    this.logger.log('Running coin expiration cron job...');
    
    // Fetch unexpired coins older than 12 months
    const coinsToExpire = await this.coinTransactionRepository.find({
      where: {
        created_at: LessThan(expirationDate),
        coinAmount: MoreThan(0),
        isExpired: false,  
      },
      relations: ['user']
    });

    if (coinsToExpire.length === 0) {
      this.logger.log('No coins to expire.');
      return;
    }

    // Mark them as expired
    for (const coin of coinsToExpire) {
      coin.isExpired = true;
      this.notificationBridge.add('coinExpiry', coin);
    }

    await this.coinTransactionRepository.save(coinsToExpire);
    this.logger.log(`Expired ${coinsToExpire.length} coin transactions.`);
  }
}

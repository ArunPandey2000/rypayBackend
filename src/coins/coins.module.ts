import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoinTransaction } from 'src/core/entities/coins.entity';
import { RedemptionRule } from 'src/core/entities/redemption-rules.entity';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { WalletBridge } from 'src/wallet/services/wallet.queue';
import { CoinsController } from './coins.controller';
import { CoinTransactionService } from './coins.service';
import { CoinCronService } from './coin-cron.service';
import { NotificationBridge } from 'src/notifications/services/notification-bridge';

@Module({
  imports: [
    BullModule.registerQueue({name: 'wallet'}),
    BullModule.registerQueue({name: 'notification'}),
    TypeOrmModule.forFeature([CoinTransaction, RedemptionRule, User, Wallet])],
  providers: [CoinTransactionService, CoinCronService, WalletBridge, NotificationBridge],
  controllers: [CoinsController],
  exports: [CoinTransactionService]
})
export class CoinsModule {}

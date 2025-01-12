import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { WalletController } from './controllers/wallet.controller';
import { WalletService } from './services/wallet.service';
import { UsersModule } from 'src/users/users.module';
import { Transaction } from 'src/core/entities/transactions.entity';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { Order } from 'src/core/entities/order.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { BullModule } from '@nestjs/bull';
import { WalletBridge } from './services/wallet.queue';
import { WalletProcessor } from './processor/wallet.processor';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User, Transaction, Order]),
  forwardRef(() => UsersModule),
  TransactionsModule,
  BullModule.registerQueue({
        name: 'wallet',
  }),
  NotificationsModule
 ],
  providers: [WalletService, WalletProcessor, WalletBridge],
  controllers: [WalletController],
  exports: [WalletService, WalletBridge]
})
export class WalletModule {}

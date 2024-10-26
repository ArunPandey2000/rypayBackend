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

@Module({
  imports: [TypeOrmModule.forFeature([Wallet, User, Transaction, Order]),
  forwardRef(() => UsersModule),
  TransactionsModule,
  NotificationsModule
 ],
  providers: [WalletService],
  controllers: [WalletController],
  exports: [WalletService]
})
export class WalletModule {}

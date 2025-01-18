import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Loan } from 'src/core/entities/loan.entity';
import { Order } from 'src/core/entities/order.entity';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { Transaction } from 'src/core/entities/transactions.entity';
import { PdfService } from 'src/pdf/services/pdf.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { CoinsModule } from 'src/coins/coins.module';

@Module({
  imports: [
    NotificationsModule,
    CoinsModule,
    TypeOrmModule.forFeature([User, Loan, Order, Wallet, Transaction])
  ],
  controllers: [LoansController],
  providers: [LoansService, WalletService, TransactionsService, PdfService],
})
export class LoansModule {}

import { Module } from '@nestjs/common';
import { TransactionsService } from './services/transactions.service';
import { TransactionsController } from './controllers/transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from 'src/core/entities/transactions.entity';
import { PdfModule } from 'src/pdf/pdf.module';
import { BullModule } from '@nestjs/bull';
import { TransactionProcessor } from './procesor/transaction-report.processor';
import { User } from 'src/core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User]),
    BullModule.registerQueue({
      name: 'transaction-report',
    }),
   PdfModule],
  providers: [TransactionsService, TransactionProcessor],
  controllers: [TransactionsController],
  exports: [TransactionsService]
})
export class TransactionsModule {}

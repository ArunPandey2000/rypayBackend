import { Module } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsController } from './subscriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plan } from 'src/core/entities/plans.entity';
import { User } from 'src/core/entities/user.entity';
import { Transaction } from 'src/core/entities/transactions.entity';
import { Subscription } from 'src/core/entities/subscriptions.entity';
import { Wallet } from 'src/core/entities/wallet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plan, User, Transaction, Subscription, Wallet])],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
})
export class SubscriptionsModule {}

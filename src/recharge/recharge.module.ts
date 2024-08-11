import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/core/entities/order.entity';
import { User } from 'src/core/entities/user.entity';
import { IntegrationModule } from 'src/integration/integration.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { RechargeController } from './controllers/recharge.controller';
import { RechargeService } from './services/recharge.service';

@Module({
  imports: [WalletModule, IntegrationModule, TypeOrmModule.forFeature([Order, User])],
  providers: [RechargeService],
  controllers: [RechargeController]
})
export class RechargeModule {}

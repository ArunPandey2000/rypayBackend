import { Module } from '@nestjs/common';
import { RechargeService } from './services/recharge.service';
import { RechargeController } from './controllers/recharge.controller';
import { WalletModule } from 'src/wallet/wallet.module';
import { IntegrationModule } from 'src/integration/integration.module';

@Module({
  imports: [WalletModule, IntegrationModule],
  providers: [RechargeService],
  controllers: [RechargeController]
})
export class RechargeModule {}

import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenClientService } from './busybox/external-system-client/access-token-client.service';
import { CardsClientService } from './busybox/external-system-client/cards-client.service';
import { MerchantClientService } from './busybox/external-system-client/merchant-client.service';
import { TransactionsClientService } from './busybox/external-system-client/transactions-client.service';
import { ExternalController } from './busybox/external/controllers/external.controller';
import { ExternalService } from './busybox/external/services/external.service';
import { RechargeClientService } from './a1topup/external-system-client/recharge/recharge-client.service';
import { KwikPayExternalController } from './a1topup/external/controllers/recharge-external.controller';

@Module({
  imports: [CacheModule.register(), HttpModule, ConfigModule],
  providers: [
    MerchantClientService,
    CardsClientService,
    AccessTokenClientService,
    TransactionsClientService,
    ExternalService,
    RechargeClientService
  ],
  controllers: [ExternalController, KwikPayExternalController],
  exports: [
    MerchantClientService,
    CardsClientService,
    TransactionsClientService,
    ExternalService,
    RechargeClientService
  ],
})
export class IntegrationModule {}

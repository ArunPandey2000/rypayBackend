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

@Module({
  imports: [CacheModule.register(), HttpModule, ConfigModule, ],
  providers: [MerchantClientService, CardsClientService, AccessTokenClientService, TransactionsClientService, ExternalService],
  controllers: [ExternalController],
  exports: [MerchantClientService, CardsClientService, TransactionsClientService, ExternalService]
})
export class IntegrationModule {}

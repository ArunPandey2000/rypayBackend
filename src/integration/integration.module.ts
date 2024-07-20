import { Module } from '@nestjs/common';
import { ExternalService } from './busybox/external/services/external.service';
import { ExternalController } from './busybox/external/controllers/external.controller';
import { MerchantClientService } from './busybox/external-system-client/merchant-client.service';
import { CardsClientService } from './busybox/external-system-client/cards-client.service';

@Module({
  providers: [MerchantClientService, CardsClientService, ExternalService],
  controllers: [ExternalController]
})
export class IntegrationModule {}

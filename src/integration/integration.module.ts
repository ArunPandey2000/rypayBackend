import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { redisStore } from 'cache-manager-redis-store';
import { WalletService } from 'src/wallet/services/wallet.service';
import { RechargeClientService } from './a1topup/external-system-client/recharge/recharge-client.service';
import { RechargeExternalController } from './a1topup/external/controllers/recharge-external.controller';
import { AccessTokenClientService } from './busybox/external-system-client/access-token-client.service';
import { CardsClientService } from './busybox/external-system-client/cards-client.service';
import { MerchantClientService } from './busybox/external-system-client/merchant-client.service';
import { TransactionsClientService } from './busybox/external-system-client/transactions-client.service';
import { ExternalController } from './busybox/external/controllers/external.controller';
import { ExternalService } from './busybox/external/services/external.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { User } from 'src/core/entities/user.entity';
import { Order } from 'src/core/entities/order.entity';
import { Transaction } from 'src/core/entities/transactions.entity';
import { PdfService } from 'src/pdf/services/pdf.service';

@Module({
  imports: [ CacheModule.register({ 
    store: redisStore as any, 
    host: 'localhost', //default host
    port: 6379 //default port
  }), HttpModule, ConfigModule, TypeOrmModule.forFeature([Wallet, User, Order, Transaction])],
  providers: [
    MerchantClientService,
    CardsClientService,
    WalletService,
    PdfService,
    TransactionsService,
    AccessTokenClientService,
    TransactionsClientService,
    ExternalService,
    RechargeClientService
  ],
  controllers: [ExternalController, RechargeExternalController],
  exports: [
    MerchantClientService,
    CardsClientService,
    TransactionsClientService,
    ExternalService,
    RechargeClientService
  ],
})
export class IntegrationModule {}

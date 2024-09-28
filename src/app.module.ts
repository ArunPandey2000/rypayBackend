import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { IntegrationModule } from './integration/integration.module';
import { NotificationsModule } from './notifications/notifications.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { WalletModule } from './wallet/wallet.module';
import { CardsModule } from './cards/cards.module';
import { TransactionsModule } from './transactions/transactions.module';
import { PdfModule } from './pdf/pdf.module';
import { RechargeModule } from './recharge/recharge.module';
import { BeneficiaryModule } from './beneficiary/beneficiary.module';

@Module({
  imports: [
    CoreModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          level: 'trace',
          targets: [{
            target: 'pino-pretty',
            options: {
              colorize: true,
              singleLine: true,
              levelFirst: false,
              translateTime: "yyyy-MM-dd'T'HH:mm:ss.l'Z'",
              messageFormat: '{req.headers.x-correlation-id} [{context}] {msg}',
              ignore: 'pid,hostname,res,context,req',
              errorLikeObjectKeys: ['err', 'error'],
            },
          },
          {
            target: 'pino/file',
            level: 'error',
            options: {
              destination: './logs/app-error.log',
              mkdir: true,
            },
          },
        ] 
        }
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    IntegrationModule,
    UsersModule,
    NotificationsModule,
    IntegrationModule,
    WalletModule,
    CardsModule,
    TransactionsModule,
    PdfModule,
    RechargeModule,
    BeneficiaryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

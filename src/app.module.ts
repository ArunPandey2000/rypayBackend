import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { IntegrationModule } from './integration/integration.module';
import { OtpFlowModule } from './otp-flow/otp-flow.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { WalletModule } from './wallet/wallet.module';
import { CardsModule } from './cards/cards.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    CoreModule,
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    IntegrationModule,
    UsersModule,
    OtpFlowModule,
    IntegrationModule,
    WalletModule,
    CardsModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

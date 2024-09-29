import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from 'src/core/entities/refresh-token.entity';
import { OtpInfo } from 'src/core/entities/otp-info.entity';
import { OtpRepository } from '../notifications/repository/otp.repository';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { IntegrationModule } from 'src/integration/integration.module';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { Transaction } from 'src/core/entities/transactions.entity';
import { PdfModule } from 'src/pdf/pdf.module';
import { Order } from 'src/core/entities/order.entity';
import { MerchantClientService } from 'src/integration/busybox/external-system-client/merchant-client.service';
import { HttpModule } from '@nestjs/axios';
import { AccessTokenClientService } from 'src/integration/busybox/external-system-client/access-token-client.service';
import { CacheModule } from '@nestjs/cache-manager';
import { CardsModule } from 'src/cards/cards.module';
import { UploadFileService } from 'src/users/services/updaload-file.service';
import { UserDocument } from 'src/core/entities/document.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Global()
@Module({
  imports: [
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([User, RefreshToken, OtpInfo, Wallet, Transaction, Order, UserDocument]),
    PdfModule,
    CacheModule.register(),
    HttpModule,
    IntegrationModule,
    NotificationsModule,
    CardsModule
  ],
  providers: [
    AuthService,
    TokenService,
    WalletService,
    TransactionsService,
    UsersService,
    UploadFileService,
    AccessTokenStrategy,
    AccessTokenClientService,
    MerchantClientService,
    RefreshTokenStrategy,
    ConfigService,
    OtpRepository,
  ],
  controllers: [AuthController],
  exports: [TokenService],
})
export class AuthModule { }

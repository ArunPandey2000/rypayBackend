import { Global, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './services/token.service';
import { OtpFlowModule } from 'src/otp-flow/otp-flow.module';
import { UsersService } from 'src/users/services/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { RefreshToken } from 'src/core/entities/refresh-token';
import { OtpInfo } from 'src/core/entities/otp-info.entity';
import { OtpRepository } from './repository/otp.repository';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { RefreshTokenStrategy } from './strategies/refresh-token.strategy';
import { IntegrationModule } from 'src/integration/integration.module';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { Transaction } from 'src/core/entities/transactions.entity';
import { PdfModule } from 'src/pdf/pdf.module';

@Global()
@Module({
  imports: [
    JwtModule.register({ global: true }),
    TypeOrmModule.forFeature([User, RefreshToken, OtpInfo, Wallet, Transaction]),
    IntegrationModule,
    PdfModule,
    OtpFlowModule,
  ],
  providers: [
    AuthService,
    TokenService,
    WalletService,
    TransactionsService,
    UsersService,
    AccessTokenStrategy,
    RefreshTokenStrategy,
    ConfigService,
    OtpRepository,
  ],
  controllers: [AuthController],
  exports: [TokenService],
})
export class AuthModule {}

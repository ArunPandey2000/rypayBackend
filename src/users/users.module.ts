import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { IntegrationModule } from 'src/integration/integration.module';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from 'src/wallet/wallet.module';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [AuthModule, IntegrationModule, CardsModule, WalletModule, ConfigModule, TypeOrmModule.forFeature([User]), forwardRef(() => WalletModule)],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}

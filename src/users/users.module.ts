import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './controllers/user.controller';
import { UsersService } from './services/users.service';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { IntegrationModule } from 'src/integration/integration.module';
import { ConfigModule } from '@nestjs/config';
import { WalletModule } from 'src/wallet/wallet.module';
import { UploadFileService } from './services/updaload-file.service';
import { UserDocument } from 'src/core/entities/document.entity';
import { ConfigService } from '@nestjs/config';
import { CardsModule } from 'src/cards/cards.module';


@Module({
  imports: [AuthModule, IntegrationModule, CardsModule, WalletModule, ConfigModule, forwardRef(() => WalletModule), TypeOrmModule.forFeature([User, UserDocument])],
  providers: [UsersService, ConfigService, UploadFileService],
  controllers: [UsersController],
  exports: [UsersService, UploadFileService],
})
export class UsersModule { }

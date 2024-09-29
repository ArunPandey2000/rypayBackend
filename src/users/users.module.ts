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
import { OtpFlowService } from 'src/notifications/services/otp-flow.service';
import { SmsClientService } from 'src/notifications/sms-client.service';
import { MailService } from 'src/notifications/services/mail.service';
import { OtpRepository } from 'src/notifications/repository/otp.repository';
import { HttpModule } from '@nestjs/axios';
import { OtpInfo } from 'src/core/entities/otp-info.entity';


@Module({
  imports: [AuthModule, HttpModule, IntegrationModule, CardsModule, WalletModule, ConfigModule, forwardRef(() => WalletModule), TypeOrmModule.forFeature([User, UserDocument, OtpInfo])],
  providers: [UsersService, ConfigService, UploadFileService, OtpFlowService, SmsClientService, MailService, OtpRepository],
  controllers: [UsersController],
  exports: [UsersService, UploadFileService],
})
export class UsersModule { }

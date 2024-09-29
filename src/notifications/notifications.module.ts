import { Module } from '@nestjs/common';
import { OtpFlowService } from './services/otp-flow.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SmsClientService } from './sms-client.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailController } from './controllers/mail.controller';
import { MailService } from './services/mail.service';
import { OtpRepository } from './repository/otp.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpInfo } from 'src/core/entities/otp-info.entity';

@Module({
  imports: [HttpModule, ConfigModule, 
    TypeOrmModule.forFeature([OtpInfo]),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "riyadhmicrofinance@gmail.com",
          pass: "xqjryatlvvyemecy",
        },
      },
    })
  ],
  controllers: [MailController],
  providers: [OtpFlowService, SmsClientService, MailService, OtpRepository],
  exports: [OtpFlowService],
})
export class NotificationsModule {}

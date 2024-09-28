import { Module } from '@nestjs/common';
import { OtpFlowService } from './services/otp-flow.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SmsClientService } from './sms-client.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [HttpModule, ConfigModule, 
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    })
  ],
  providers: [OtpFlowService, SmsClientService],
  exports: [OtpFlowService],
})
export class NotificationsModule {}

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
import { Notification } from 'src/core/entities/notification.entity';
import { NotificationController } from './controllers/notification.controller';
import { BullModule } from '@nestjs/bull';
import { NotificationBridge } from './services/notification-bridge';
import { NotificationService } from './services/notification.service';
import { ScheduleModule } from '@nestjs/schedule';
import { User } from 'src/core/entities/user.entity';
import { NotificationCronJob } from './services/notification-delete-cron.service';
import { NotificationProcessor } from './procesor/notification.processor';
import { FirebaseClientService } from 'src/integration/firebase/firebase.client.service';

@Module({
  imports: [HttpModule, ConfigModule, 
    TypeOrmModule.forFeature([OtpInfo, Notification, User]),
    ScheduleModule.forRoot(),
    BullModule.registerQueue({
      name: 'notification',
    }),
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
  controllers: [NotificationController, MailController],
  providers: [OtpFlowService, NotificationCronJob, NotificationProcessor, NotificationBridge, NotificationService, SmsClientService, MailService, OtpRepository, FirebaseClientService],
  exports: [OtpFlowService, NotificationBridge],
})
export class NotificationsModule {}

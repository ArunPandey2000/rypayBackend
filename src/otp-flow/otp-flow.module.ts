import { Module } from '@nestjs/common';
import { OtpFlowService } from './services/otp-flow.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { SmsClientService } from './sms-client.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [OtpFlowService, SmsClientService],
  exports: [OtpFlowService]
})
export class OtpFlowModule {}

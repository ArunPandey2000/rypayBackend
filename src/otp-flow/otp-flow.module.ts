import { Module } from '@nestjs/common';
import { OtpFlowService } from './services/otp-flow.service';

@Module({
  providers: [OtpFlowService]
})
export class SmsModule {}

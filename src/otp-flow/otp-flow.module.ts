import { Module } from '@nestjs/common';
import { OtpFlowService } from './services/otp-flow.service';

@Module({
  providers: [OtpFlowService],
  exports: [OtpFlowService]
})
export class OtpFlowModule {}

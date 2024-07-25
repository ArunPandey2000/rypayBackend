import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionNotifyPayload } from '../interfaces/transaction-notify.interface';
import { KycWebhookPayload } from '../interfaces/kyc-webhook-payload.interface';

@Controller('external')
@ApiTags('External')
export class ExternalController {
  @Post('transactions')
  async handleTransactions(payload: TransactionNotifyPayload) {
    //webhook processing logic
  }

  @Post('kyc-events')
  async handleKycEvents(payload: KycWebhookPayload) {
    // webhook processing logic
  }
}

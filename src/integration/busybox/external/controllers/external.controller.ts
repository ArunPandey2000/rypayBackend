import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TransactionNotifyPayload } from '../interfaces/transaction-notify.interface';
import { KycWebhookPayload } from '../interfaces/kyc-webhook-payload.interface';
import { WalletService } from 'src/wallet/services/wallet.service';
import { ExternalService } from '../services/external.service';
import { TransactionDto } from '../interfaces/upi-transaction-payload.dto';

@Controller('external')
@ApiTags('External')
export class ExternalController {

  constructor(
    private externalService: ExternalService
  ) {

  }
  @Post('transactions')
  async handleTransactions(@Body() payload: TransactionNotifyPayload) {
    return this.externalService.handleCardtransactions(payload);
    //webhook processing logic
  }

  @Post('kyc-events')
  async handleKycEvents(@Body() payload: KycWebhookPayload) {
    return this.externalService.handleKycEvents(payload);
    // webhook processing logic
  }

  @Post('debit')
  async handleDebitEvents(@Body() payload: TransactionDto) {
    return this.externalService.handleDebitEvents(payload);
    // webhook processing logic
  }

  @Post('upi')
  async handleUpiEvents(@Body() payload: TransactionDto) {
    return this.externalService.handleUpiEvents(payload);
    // webhook processing logic
  }
}

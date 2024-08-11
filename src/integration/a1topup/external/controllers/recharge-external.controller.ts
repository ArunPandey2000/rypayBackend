import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import { WalletService } from 'src/wallet/services/wallet.service';
import { RechargeTransactionPayloadDto } from '../dto/recharge-callback.dto';

@Controller('external')
@ApiTags('External')
export class RechargeExternalController {
    constructor(@InjectPinoLogger(RechargeExternalController.name) private logger: Logger,
    private walletService: WalletService,
  ) {
    }
  @Post('recharge/callback')
  async handleTransactions(@Body() body: RechargeTransactionPayloadDto) {
    console.log(body);
    if (body.status === 'FAILED') {
      // refund wallet money, update order and transaction status to failed
      this.walletService.processRechargeRefundPayment(body.urid);
    }
    else if (body.status === 'SUCCESS') {
      //update order and transaction status to success and update transaction id of order
      this.walletService.processRechargeSuccess(body.urid, body.transId);
    } else if(body.status === 'DISPUTED' || body.status === 'PENDING') {
      console.log('what to do here??')
    } else {
      throw new BadRequestException('invalid status');
    }
  }
}

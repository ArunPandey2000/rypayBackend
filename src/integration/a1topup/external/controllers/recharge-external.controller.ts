import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import { WalletService } from 'src/wallet/services/wallet.service';
import { RechargeTransactionPayloadDto } from '../dto/recharge-callback.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WebhookResponse } from 'src/core/entities/webhook.entity';
import { DeepPartial, Repository } from 'typeorm';

@Controller('external')
@ApiTags('External')
export class RechargeExternalController {
    constructor(@InjectPinoLogger(RechargeExternalController.name) private logger: Logger,
    @InjectRepository(WebhookResponse) private webhookRepo: Repository<WebhookResponse>,
    private walletService: WalletService,
  ) {
    }
  @Post('recharge/callback')
  async handleTransactions(@Body() body: RechargeTransactionPayloadDto) {
    try {
      const webHookData = this.getWebHookData(body);
      const webHookEntity = this.webhookRepo.create(webHookData);
      await this.webhookRepo.save(webHookEntity)
      if (body.status === 'FAILED') {
        // refund wallet money, update order and transaction status to failed
        this.walletService.processRechargeRefundPayment(body.urid);
      }
      else if (body.status === 'SUCCESS') {
        //update order and transaction status to success and update transaction id of order
        this.walletService.processRechargeSuccess(body.urid, body.transId, body.orderId);
      } else if(body.status === 'DISPUTED' || body.status === 'PENDING') {
        console.log('what to do here??')
      } else {
        throw new BadRequestException('invalid status');
      }
    } catch (err) {
       this.logger.error('recharge callback error', err);
       throw err;
    }
  }

  getWebHookData(body: RechargeTransactionPayloadDto) {
    return <DeepPartial<WebhookResponse>>{
      rypayOrderId: body.urid,
      webHookOrderId: body.orderId,
      status: body.status,
      transId: body.transId,
      additionalData: body
    }
  }
}

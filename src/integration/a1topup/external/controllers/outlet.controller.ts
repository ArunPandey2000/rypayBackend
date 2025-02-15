import { BadRequestException, Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import { WebhookResponse } from 'src/core/entities/webhook.entity';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { RechargeTransactionPayloadDto } from '../dto/recharge-callback.dto';

@Controller('outlet')
@ApiTags('Outlet')
export class OutletController {
    constructor(@InjectPinoLogger(OutletController.name) private logger: Logger,
    @InjectRepository(WebhookResponse) private webhookRepo: Repository<WebhookResponse>,
    private walletService: WalletService,
  ) {
    }
  @Get('/bank-list')
  async getAEPSBankList(@Body() body: RechargeTransactionPayloadDto) {
    try {
      
    } catch (err) {
       this.logger.error('recharge callback error', err);
       throw err;
    }
  }

}

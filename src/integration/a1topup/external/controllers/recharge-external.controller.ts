import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectPinoLogger, Logger } from 'nestjs-pino';

@Controller('external')
@ApiTags('External')
export class KwikPayExternalController {
    constructor(@InjectPinoLogger(KwikPayExternalController.name) private logger: Logger) {

    }
  @Get('callback')
  async handleTransactions(@Query() query: any) {
    return 'mda561';
    //webhook processing logic
  }
}

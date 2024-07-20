import { Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('external')
@ApiTags('External')
export class ExternalController {
    @Post('transactions')
    async handleTransactions() {

    }

    @Post('kyc-events')
    async handleKycEvents() {
        
    }

}

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentExternalService } from '../services/payment-external.service';
import { PaymentRequestDto } from '../dto/payment-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('external')
@ApiBearerAuth()
@ApiTags('External')
@UseGuards(JwtAuthGuard)
export class PaymentGatewayController {

  constructor(
    private externalService: PaymentExternalService
  ) {}
  
  @Post('payment/request')
  async handleKycEvents(@Req() req: any, @Body() payload: PaymentRequestDto) {
    return this.externalService.createPaymentRequestOrder(req.user.sub, payload);
  }
}

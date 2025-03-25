import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaymentExternalService } from '../services/payment-external.service';
import { PaymentRequestDto } from '../dto/payment-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MergedDataResponseDTO } from '../dto/settlement-history.dto';
import { PaymentExternalClientService } from '../../external-system-client/payment-external-client.service';

@Controller('external')
@ApiBearerAuth()
@ApiTags('External')
@UseGuards(JwtAuthGuard)
export class PaymentGatewayController {

  constructor(
    private externalService: PaymentExternalService,
    private resellerExternalCLient: PaymentExternalClientService
  ) {}
  
  @Post('payment/request')
  async handleKycEvents(@Req() req: any, @Body() payload: PaymentRequestDto) {
    return this.externalService.createPaymentRequestOrder(req.user.sub, payload);
  }

  @Get('settlements')
  @ApiOperation({ summary: 'Get merged transaction and settlement data' })
  @ApiQuery({ name: 'startDate', required: true, example: '2025-03-01' })
  @ApiQuery({ name: 'endDate', required: true, example: '2025-03-20' })
  @ApiQuery({ name: 'merchantId', required: false, example: 'THANDICOFF' })
  @ApiResponse({
    status: 200,
    description: 'Merged transaction and settlement data',
    type: MergedDataResponseDTO,
  })
  async getMergedData(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('merchantId') merchantId?: string,
  ): Promise<MergedDataResponseDTO> {
    return this.resellerExternalCLient.getMergedData(startDate, endDate, merchantId);
  }
}

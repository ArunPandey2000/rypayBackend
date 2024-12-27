import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransactionNotifyPayload } from '../interfaces/transaction-notify.interface';
import { KycWebhookPayload } from '../interfaces/kyc-webhook-payload.interface';
import { WalletService } from 'src/wallet/services/wallet.service';
import { ExternalService } from '../services/external.service';
import { TransactionDto } from '../interfaces/upi-transaction-payload.dto';
import { AccountPayoutPayload } from '../dto/payout-payload.dto';
import { PayoutService } from '../services/payout.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { VerifyAccountResponseDTO } from '../dto/verify-account-response.dto';
import { VerifyAccountRequestDTO } from '../dto/verify-account-request.dto';
import { VerifyUpiRequestDTO } from '../dto/verify-upi-request.dto';

@Controller('account')
@ApiTags('Account')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PayoutController {

  constructor(
    private payoutService: PayoutService
  ) {

  }

  @Post('payout')
  async handleTransactions(@Req() req: any, @Body() payload: AccountPayoutPayload) {
    return this.payoutService.payoutAccount(req.user.sub, payload);
  }

  @Post('verify')
  @ApiOperation({ summary: 'Verify a bank account' })
  @ApiResponse({
    status: 200,
    description: 'The account verification result',
    type: VerifyAccountResponseDTO,
  })
  async verifyAccount(
    @Body() verifyAccountRequestDTO: VerifyAccountRequestDTO
  ): Promise<VerifyAccountResponseDTO> {
    return this.payoutService.verifyAccount(verifyAccountRequestDTO);
  }

  @Post('verify/upi')
  @ApiOperation({ summary: 'Verify upi id' })
  @ApiResponse({
    status: 200,
    description: 'The account verification result',
    type: VerifyAccountResponseDTO,
  })
  async verifyUpi(
    @Body() verifyAccountRequestDTO: VerifyUpiRequestDTO
  ): Promise<VerifyAccountResponseDTO> {
    return this.payoutService.verifyUpi(verifyAccountRequestDTO);
  }

  
}

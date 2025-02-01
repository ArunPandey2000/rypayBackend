import { AccountPayoutPayload } from '../dto/payout-payload.dto';
import { PayoutService } from '../services/payout.service';
import { VerifyAccountResponseDTO } from '../dto/verify-account-response.dto';
import { VerifyAccountRequestDTO } from '../dto/verify-account-request.dto';
import { VerifyUpiRequestDTO } from '../dto/verify-upi-request.dto';
import { UPIPayoutPayload } from '../dto/upi-account-payload.dto';
export declare class PayoutController {
    private payoutService;
    constructor(payoutService: PayoutService);
    handleTransactions(req: any, payload: AccountPayoutPayload): Promise<{
        referenceId: string;
        amount: number;
        message: string;
    }>;
    handleUpiPayout(req: any, payload: UPIPayoutPayload): Promise<{
        referenceId: string;
        amount: number;
        message: string;
    }>;
    verifyAccount(verifyAccountRequestDTO: VerifyAccountRequestDTO): Promise<VerifyAccountResponseDTO>;
    verifyUpi(verifyAccountRequestDTO: VerifyUpiRequestDTO): Promise<VerifyAccountResponseDTO>;
}

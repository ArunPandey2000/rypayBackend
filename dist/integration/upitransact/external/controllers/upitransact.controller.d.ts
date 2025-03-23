import { PaymentExternalService } from '../services/payment-external.service';
import { PaymentRequestDto } from '../dto/payment-request.dto';
export declare class PaymentGatewayController {
    private externalService;
    constructor(externalService: PaymentExternalService);
    handleKycEvents(req: any, payload: PaymentRequestDto): Promise<{
        referenceId: string;
        amount: number;
        message: string;
    }>;
}

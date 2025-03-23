import { WebhookPaymentRequestDto } from '../dto/webhook-payload.dto';
import { PaymentExternalService } from '../services/payment-external.service';
export declare class ExternalPaymentGatewayController {
    private externalService;
    constructor(externalService: PaymentExternalService);
    handleKycEvents(payload: WebhookPaymentRequestDto): Promise<{
        referenceId: string;
        amount: number;
        message: string;
    }>;
}

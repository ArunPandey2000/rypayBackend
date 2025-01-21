import { Observable } from 'rxjs';
import { SseService } from '../services/sse-service';
declare class WebhookRequest {
    userId: string;
    rechargeId: string;
    status: string;
}
export declare class SseController {
    private readonly sseService;
    constructor(sseService: SseService);
    private sseSubject;
    sse(req: any, id: string): Observable<any>;
    handleWebhook(body: WebhookRequest): string;
}
export {};

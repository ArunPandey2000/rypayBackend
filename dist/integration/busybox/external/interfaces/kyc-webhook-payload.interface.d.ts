export declare class KycWebhookPayload {
    cardholderId: string;
    kycType: string;
    issuerCode: string;
    kycStatus: string;
    eventId: string;
    errorCode?: string;
    errorMessage?: string;
}

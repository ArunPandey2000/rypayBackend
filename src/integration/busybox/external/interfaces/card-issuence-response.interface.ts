export interface CardIssuanceResponse {
    statusCode: string;
    status: string;
    data: {
        message: string;
        cardHolderId: string;
    };
    sessionId: string;
}
  
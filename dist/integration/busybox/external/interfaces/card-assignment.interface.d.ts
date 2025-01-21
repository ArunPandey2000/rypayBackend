export interface CardData {
    nameOnCard: string;
    customer_id: string;
    cardId: string;
    wallet_id: string;
    last_4_digit: string;
    balance: string;
}
export interface CardAssignmentResponse {
    statusCode: string;
    message: string;
    card_data: CardData;
}
export interface CardAssignmentDto {
    orgId: string;
    mobile_number: string;
    kitNumber: string;
}

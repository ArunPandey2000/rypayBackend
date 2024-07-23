export interface CustomerData {
    nameOnCard: string;
    customer_id: string;
    cardId: string;
    wallet_id: string;
    last_4_digit: string;
    balance: string;
}
  
export interface CardStatusResponse {
statusCode: string;
status: string;
message: string;
customer_data: CustomerData;
}
  
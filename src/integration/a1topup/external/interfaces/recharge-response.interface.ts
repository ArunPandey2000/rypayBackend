
export interface TransactionResponse {
  order_id: string;
  operator_ref: string;
  status: string;
  number: string;
  amount: string;
  service: string;
  charged_amount: string;
  closing_balance: string;
  available_balance: string;
  pid: string;
  date: string;
}

export interface IRechargeData {
  orderId: string;       // Order ID, e.g., "1210708"
  status: string;        // Status of the order, e.g., "PENDING"
  mobile: string;        // Mobile number associated with the order
  amount: string;        // Amount related to the order, as a string
  transId: string;       // Transaction ID, could be empty
  resCode: string;       // Response code, e.g., "201"
  p2pBuyerBal: string;   // P2P Buyer Balance, as a string
  p2aBuyerBal: string;   // P2A Buyer Balance, as a string
  creditUsed: string;    // Credit used, as a string
  resText: string;       // Response text, could be empty
}

export interface IRechargeResponse {
  data: IRechargeData; // The data object containing order details
}


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

export interface IRechargeResponse {
  status: string;
  order_id: string;
  opr_id: string;
  balance: string;
  number: string;
  provider: string;
  amount: string;
  charged_amount: string;
  message: string;
}
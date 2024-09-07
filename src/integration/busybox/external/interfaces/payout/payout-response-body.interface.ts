export interface IAccountPayoutResponseDTO {
    resp_code: string;
    status: string;
    message: string;
    bene_name?: string;
    customer_account: string;
    bene_bank: string;
    amount: string;
    charge: string;
    rrn?: string;
    stan: number;
    txn_date: string;
    total_amount: string;
}
  
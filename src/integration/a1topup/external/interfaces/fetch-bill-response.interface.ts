export interface IFetchBillResponse {
    status: string;
    provider: string;
    message: string;
    due_amount: string;
    due_date: string;
    customer_name: string;
    bill_number: string;
    bill_date: string;
    bill_period: string;
    ref_id: string;
    service: string;
    Additional: string | null;
  }
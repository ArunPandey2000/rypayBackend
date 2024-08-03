export interface TransactionStatusResponse {
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
export interface Transaction {
    reference_no: string;
    amount: string;
    current_balance: string;
    status: string;
}
export interface TransactionResponse {
    statusCode: string;
    status: string;
    message: string;
    transaction: Transaction;
}
export interface TransactionDto {
    reference_no: string;
    mobile_number: string;
    amount: number;
    remark: string;
}

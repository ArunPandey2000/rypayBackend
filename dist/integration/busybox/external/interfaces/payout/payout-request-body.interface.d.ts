export interface IAccountPayoutRequestBody {
    account_number: string;
    ifsc_code: string;
    amount: number;
    mobile: string;
    mode: string;
}

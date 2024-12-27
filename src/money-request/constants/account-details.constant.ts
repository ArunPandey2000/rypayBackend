import { AccountDetails } from "../dto/account-details.dto";

export const AllowedStatuses = {
    Requested: 'Requested',
    Rejected: 'Rejected',
    Paid: 'Paid'
}
export type MoneyRequestStatuses = keyof typeof AllowedStatuses;
export const AccountDetailsConst: AccountDetails = {
    accountName: 'Riyadh Microfinance Pvt Ltd',
    accountNumber: '20513207222',
    IFSC: 'SBIN0015928',
    BankName: 'State Bank Of India'
}
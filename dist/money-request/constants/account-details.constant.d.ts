import { AccountDetails } from "../dto/account-details.dto";
export declare const AllowedStatuses: {
    Requested: string;
    Rejected: string;
    Paid: string;
};
export type MoneyRequestStatuses = keyof typeof AllowedStatuses;
export declare const AccountDetailsConst: AccountDetails;

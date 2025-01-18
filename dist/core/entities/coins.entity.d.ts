import { User } from "./user.entity";
export declare class CoinTransaction {
    id: number;
    coinAmount: number;
    created_at: Date;
    user: User;
    redemptionValue: number;
    mainWalletTransactionId: string;
    isExpired: boolean;
}

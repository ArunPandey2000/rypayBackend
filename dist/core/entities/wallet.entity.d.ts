import { User } from './user.entity';
export declare class Wallet {
    id: number;
    balance: number;
    status: string;
    walletAccountNo: string;
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

import { Transaction } from "src/core/entities/transactions.entity";
import { User } from "src/core/entities/user.entity";
declare class TransactionUser {
    name: string;
    phoneNumber: string;
    constructor(user: User);
}
export declare class TransactionDetailDto {
    amount: number;
    walletBalanceBefore: number;
    walletBalanceAfter: number;
    accountNumber: string | null;
    sender: TransactionUser;
    receiver: TransactionUser;
    reference: string;
    description: string;
    transactionHash: string;
    transactionType: string;
    transactionDate: Date;
    createdAt: Date;
    serviceUsed: string;
    updatedAt: Date;
    constructor(transaction: Transaction, senderUser: User, receiver: User);
}
export {};

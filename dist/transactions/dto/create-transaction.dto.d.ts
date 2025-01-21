import { User } from "src/core/entities/user.entity";
import { TransactionType } from "../enum/transaction-type.enum";
import { TransactionStatus } from "src/core/entities/transactions.entity";
export declare class CreateTransactionDto {
    amount: number;
    user: User;
    type: TransactionType;
    serviceUsed: string;
    transactionHash: string;
    description: string;
    reference: string;
    walletBalanceBefore: number;
    walletBalanceAfter: number;
    sender: string;
    receiver: string;
    transactionDate: Date;
    status: TransactionStatus;
}

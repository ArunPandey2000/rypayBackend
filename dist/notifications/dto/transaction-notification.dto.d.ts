import { ServiceTypes } from "src/core/constants/service-types.constant";
import { NotificationType } from "src/core/entities/notification.entity";
import { TransactionStatus } from "src/core/entities/transactions.entity";
import { User } from "src/core/entities/user.entity";
import { Wallet } from "src/core/entities/wallet.entity";
import { TransactionType } from "src/transactions/enum/transaction-type.enum";
export declare class TransactionNotification {
    transaction: {
        user: User;
        type: TransactionType;
        amount: number;
        description: string;
        transactionDate: Date;
        walletBalanceBefore: number;
        walletBalanceAfter: number;
        wallet: Wallet;
        status: TransactionStatus;
        sender: string;
        receiver: string;
        serviceUsed: typeof ServiceTypes;
    };
    type: NotificationType;
}

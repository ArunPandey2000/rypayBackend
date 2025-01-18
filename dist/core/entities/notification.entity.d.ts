import { User } from './user.entity';
export declare enum NotificationType {
    TRANSACTION_CREDIT = "TRANSACTION_CREDIT",
    TRANSACTION_DEBIT = "TRANSACTION_DEBIT",
    TRANSACTION_FAILED = "TRANSACTION_FAILED",
    RECHARGE_SUCCESS = "RECHARGE_SUCCESS",
    RECHARGE_FAILED = "RECHARGE_FAILED",
    ANNOUNCEMENT = "ANNOUNCEMENT",
    REFERREL_BONUS = "REFERREL_BONUS",
    CASHBACK_REDEEMED = "CASHBACK_REDEEMED",
    RYCOIN_EXPIRED = "RYCOIN_EXPIRED"
}
export declare class Notification {
    id: number;
    message: string;
    type: NotificationType;
    user: User | null;
    isRead: boolean;
    createdAt: Date;
}

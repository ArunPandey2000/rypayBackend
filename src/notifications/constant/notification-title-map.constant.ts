import { NotificationType } from "src/core/entities/notification.entity";

const NotificationTitleMap = new Map<NotificationType, string>([
    [NotificationType.TRANSACTION_CREDIT, 'Transaction Credited'],
    [NotificationType.TRANSACTION_DEBIT, 'Transaction Debited'],
    [NotificationType.TRANSACTION_FAILED, 'Transaction Failed'],
    [NotificationType.RECHARGE_SUCCESS, 'Recharge Successful'],
    [NotificationType.RECHARGE_FAILED, 'Recharge Failed'],
    [NotificationType.ANNOUNCEMENT, 'New Announcement'],
    [NotificationType.REFERREL_BONUS, 'Referral Bonus Earned'],
    [NotificationType.CASHBACK_REDEEMED, 'Cashback Redeemed'],
    [NotificationType.NewUserRegistration, 'Welcome Aboard!'],
    [NotificationType.RYCOIN_EXPIRED, 'RyCoin Expired'],
]);

export default NotificationTitleMap;

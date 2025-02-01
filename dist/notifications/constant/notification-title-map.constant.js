"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_entity_1 = require("../../core/entities/notification.entity");
const NotificationTitleMap = new Map([
    [notification_entity_1.NotificationType.TRANSACTION_CREDIT, 'Transaction Credited'],
    [notification_entity_1.NotificationType.TRANSACTION_DEBIT, 'Transaction Debited'],
    [notification_entity_1.NotificationType.TRANSACTION_FAILED, 'Transaction Failed'],
    [notification_entity_1.NotificationType.RECHARGE_SUCCESS, 'Recharge Successful'],
    [notification_entity_1.NotificationType.RECHARGE_FAILED, 'Recharge Failed'],
    [notification_entity_1.NotificationType.ANNOUNCEMENT, 'New Announcement'],
    [notification_entity_1.NotificationType.REFERREL_BONUS, 'Referral Bonus Earned'],
    [notification_entity_1.NotificationType.CASHBACK_REDEEMED, 'Cashback Redeemed'],
    [notification_entity_1.NotificationType.NewUserRegistration, 'Welcome Aboard!'],
    [notification_entity_1.NotificationType.RYCOIN_EXPIRED, 'RyCoin Expired'],
]);
exports.default = NotificationTitleMap;
//# sourceMappingURL=notification-title-map.constant.js.map
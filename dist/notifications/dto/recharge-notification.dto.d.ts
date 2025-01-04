import { NotificationType } from "src/core/entities/notification.entity";
import { Order } from "src/core/entities/order.entity";
import { Transaction } from "src/core/entities/transactions.entity";
export declare class RechargeNotificationDto {
    order: Order;
    transaction: Transaction;
    type: NotificationType;
}

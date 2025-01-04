import { User } from './user.entity';
export declare enum OrderType {
    RECHARGE = "RECHARGE",
    TRANSFER = "TRANSFER",
    PAYMENT = "PAYMENT",
    PAYOUT = "PAYOUT",
    UPI_PAYOUT = "UPI_PAYOUT"
}
export declare enum OrderStatus {
    PENDING = "PENDING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    DISPUTED = "DISPUTED"
}
export declare class Order {
    order_id: string;
    user: User;
    order_type: OrderType;
    amount: number;
    status: OrderStatus;
    transaction_id: string;
    payment_method: string;
    gateway_response: string;
    description: string;
    created_at: Date;
    updated_at: Date;
}

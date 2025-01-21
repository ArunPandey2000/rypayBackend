import { User } from "./user.entity";
export declare class MoneyRequest {
    id: number;
    paidAt: Date;
    modeOfPayment: string;
    UTR: string;
    paidAmount: number;
    status: 'Requested' | 'Rejected' | 'Paid';
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

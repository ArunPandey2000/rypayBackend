import { User } from "./user.entity";
export declare class Loan {
    id: number;
    loanAccount: string;
    installmentAmount: number;
    overdueAmount: number;
    totalAmount: number;
    dueDate: Date;
    loanStatus: 'Pending' | 'PartiallyPaid' | 'Paid';
    user: User;
    createdAt: Date;
    updatedAt: Date;
}

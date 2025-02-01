import { Loan } from 'src/core/entities/loan.entity';
export declare class LoanResponseDto {
    id: number;
    loanAccount: string;
    totalAmountPayable: number;
    loanStatus: 'Pending' | 'PartiallyPaid' | 'Paid';
    dueDate: Date;
    constructor(loanEntity: Loan);
}
export declare class LoanAdminResponseDto extends LoanResponseDto {
    updatedAt: Date;
    createdAt: Date;
    totalLoanAmount: number;
    constructor(loanEntity: Loan);
}

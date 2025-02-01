export declare class UpdateLoanDto {
    loanStatus: 'Pending' | 'PartiallyPaid' | 'Paid';
    overdueAmount: number;
    installmentAmount: number;
}

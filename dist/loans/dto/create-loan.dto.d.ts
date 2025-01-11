import { ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
export declare class IsDateInFuture implements ValidatorConstraintInterface {
    validate(date: Date, args: ValidationArguments): boolean;
    defaultMessage(args: ValidationArguments): string;
}
export declare class CreateLoanDto {
    loanId: string;
    installmentAmount: number;
    overdueAmount?: number;
    installmentDate: Date;
    totalAmount: number;
    userId: string;
}

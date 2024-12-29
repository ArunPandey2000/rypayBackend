import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional, IsDate, Validate, ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, IsDateString } from 'class-validator';


@ValidatorConstraint({ async: false })
export class IsDateInFuture implements ValidatorConstraintInterface {
  validate(date: Date, args: ValidationArguments) {
    // Ensure the date is not in the past
    return date ? new Date(date).getTime() > Date.now() : true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Overdue date should not be in the past';
  }
}
export class CreateLoanDto {
  @ApiProperty({
    description: 'Unique ID from another system',
    example: 'LN12345',
  })
  @IsNotEmpty()
  @IsString()
  loanId: string;

  @ApiProperty({
    description: 'Amount for each installment',
    example: 2000,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  installmentAmount: number;

  @ApiProperty({
    description: 'Overdue amount (if any)',
    example: 0,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  overdueAmount?: number;

  @ApiProperty({
    description: 'Overdue date',
  })
  @IsDateString()
  @Validate(IsDateInFuture, {
    message: 'Overdue date should not be in the past',
  })
  installmentDate: Date;

  @ApiProperty({
    description: 'Total amount of the loan',
    example: 50000,
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @ApiProperty({
    description: 'User ID associated with the loan',
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}

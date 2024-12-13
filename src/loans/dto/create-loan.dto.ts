import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString, IsOptional } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({
    description: 'Unique ID from another system',
    example: 'LN12345',
  })
  @IsNotEmpty()
  @IsString()
  loanId: string;

  @ApiProperty({
    description: 'Name or description of the loan',
    example: 'Home Loan',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

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

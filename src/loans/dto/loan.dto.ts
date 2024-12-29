import { ApiProperty } from '@nestjs/swagger';
import { Loan } from 'src/core/entities/loan.entity';

export class LoanResponseDto {

    @ApiProperty({
    description: 'The unique identifier',
    example: '1',
    })
    id: number;
  @ApiProperty({
    description: 'The unique loan identifier',
    example: 'LN12345',
  })
  loanAccount: string;

  @ApiProperty({
    description: 'The total loan amount',
    example: 2000.00,
  })
  totalAmountPayable: number;

  @ApiProperty({
    description: 'The current status of the loan',
    enum: ['Pending', 'PartiallyPaid', 'Paid'],
    example: 'Pending',
  })
  loanStatus: 'Pending' | 'PartiallyPaid' | 'Paid';

  @ApiProperty({
    description: 'laon overdue date',
    example: '2024-12-29T00:00:00Z',
  })
  dueDate: Date;

  constructor(loanEntity: Loan) {
    this.id = loanEntity.id;
    this.loanAccount = loanEntity.loanAccount;
    this.loanStatus = loanEntity.loanStatus;
    this.totalAmountPayable = Number.parseFloat(loanEntity.overdueAmount.toString()) + Number.parseFloat(loanEntity.installmentAmount.toString());
    this.dueDate = loanEntity.dueDate
  }
}

export class LoanAdminResponseDto extends LoanResponseDto {
    
  
    @ApiProperty({
      description: 'The date when the loan was last updated',
      example: '2024-12-29T00:00:00Z',
    })
    updatedAt: Date;

    @ApiProperty({
    description: 'The date when the loan was last updated',
    example: '2024-12-29T00:00:00Z',
    })
    createdAt: Date;
    
    @ApiProperty({
        description: 'The total Loan amount',
        example: 500000,
      })
      totalLoanAmount: number;
  
    constructor(loanEntity: Loan) {
      super(loanEntity);
      this.totalLoanAmount = loanEntity.totalAmount;
      this.updatedAt = loanEntity.updatedAt,
      this.createdAt = loanEntity.createdAt;
    }
  }

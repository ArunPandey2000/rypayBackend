import { ApiProperty } from '@nestjs/swagger';
import { PlanLimit } from 'src/core/entities/plan-limit.entity';

export class PlanLimitResponseDto {
  @ApiProperty({ example: 'UPI' })
  transactionType: string;

  @ApiProperty({ example: null, nullable: true })
  perTransactionLimit: number | null;

  @ApiProperty({ example: 10000 })
  dailyLimit: number;

  @ApiProperty({ example: 100000 })
  monthlyLimit: number;

  constructor(planLimit: PlanLimit) {
    this.transactionType = planLimit.transactionType;
    this.perTransactionLimit = planLimit.perTransactionLimit;
    this.dailyLimit = planLimit.dailyLimit;
    this.monthlyLimit = planLimit.monthlyLimit;
  }
}

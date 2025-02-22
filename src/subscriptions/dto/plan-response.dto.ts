import { ApiProperty } from '@nestjs/swagger';
import { Plan } from 'src/core/entities/plans.entity';
import { PlanLimitResponseDto } from './plan-limit-response.dto';

export class PlanResponseDto {
  @ApiProperty({ example: 'a7d3117c-0b0b-4756-afa7-adb1b55bedd5' })
  id: string;

  @ApiProperty({ example: 'Basic Plan' })
  name: string;

  @ApiProperty({ example: 249 })
  price: number;

  @ApiProperty({ example: 30 })
  durationInDays: number;

  @ApiProperty({ example: 'Basic plan with enhanced limits.' })
  description: string;

  @ApiProperty({ type: [PlanLimitResponseDto] })
  limits: PlanLimitResponseDto[];

  constructor(plan: Plan) {
    this.id = plan.id;
    this.name = plan.name;
    this.price = plan.price;
    this.durationInDays = plan.duration;
    this.limits = plan.limits.map((limit) => new PlanLimitResponseDto(limit));
  }
}

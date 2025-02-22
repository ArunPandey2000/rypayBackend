import { Plan } from 'src/core/entities/plans.entity';
import { PlanLimitResponseDto } from './plan-limit-response.dto';
export declare class PlanResponseDto {
    id: string;
    name: string;
    price: number;
    durationInDays: number;
    description: string;
    limits: PlanLimitResponseDto[];
    constructor(plan: Plan);
}

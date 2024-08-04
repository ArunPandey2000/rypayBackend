import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { IPlan, IRechargePlanApiResponse } from "src/integration/a1topup/external/interfaces/recharge-plans-api-response.interface";

export class PlanDto {
    @ApiProperty({ description: 'The price of the plan' })
    price: number;
    @ApiProperty({ description: 'The duration of the plan' })
    duration: string;
    @ApiProperty({ description: 'The description of the plan' })
    detail: string;
    @ApiProperty({ description: 'The type of the plan' })
    rechargeType: string;

    constructor(plan: IPlan) {
        this.price = plan.rs;
        this.duration = plan.validity;
        this.detail = plan.desc;
        this.rechargeType = plan.Type;
    }
}

export class PlanResponse {
    @ApiProperty()
    operator: string;
    @ApiProperty()
    circle: string;
    @ApiProperty({ description: 'The plans available', type: 'object', additionalProperties: { type: 'array', items: { type: 'object', properties: {
        duration: {
            type: 'string',
            description: 'The duration of the plan'
        },
        price: {
            type: 'string',
            description: 'The price of the plan'
        },
        detail: {
            type: 'string',
            description: 'The description of the plan'
        },
        rechargeType: {
            type: 'string',
            description: 'The type of the plan'
        }
    } } } })
    plans: Record<string, PlanDto[]>;

    constructor(plan: IRechargePlanApiResponse) {
        this.operator = plan.operator;
        this.circle = plan.circle;
        this.plans = this.mapPlansRecordToDto(plan.plans)
    }

    mapPlansRecordToDto(plansRecord: Record<string, IPlan[]>): Record<string, PlanDto[]> {
        const mappedRecord: Record<string, PlanDto[]> = {};
      
        for (const key in plansRecord) {
          if (plansRecord.hasOwnProperty(key)) {
            mappedRecord[key] = plansRecord[key].map(plan => new PlanDto(plan));
          }
        }
      
        return mappedRecord;
      }
}

export class PlanRequestDto {
    @ApiProperty()
    operatorId: string;
    @ApiProperty()
    circleCode: string;
}
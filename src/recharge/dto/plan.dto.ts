import { ApiProperty } from "@nestjs/swagger";
import { IPlan } from "src/integration/a1topup/external/interfaces/recharge-plans-api-response.interface";
import { getRechargeFullForm } from "../constants/recharge-plan-type-mapper.constant";

class PlanDto {
    @ApiProperty({ description: 'The price of the plan' })
    price: number;

    @ApiProperty({ description: 'The duration of the plan' })
    duration: string;

    @ApiProperty({ description: 'The description of the plan' })
    detail: string;

    @ApiProperty({ description: 'The type of the plan' })
    rechargeType: string;

    @ApiProperty({ description: 'The data available on the plan' })
    data: string;

    @ApiProperty({ description: 'The talktime available on the plan' })
    talkTime: string;

    constructor(plan: IPlan) {
        this.price = plan.amount;
        this.duration = plan.validity;
        this.detail = plan.detail;
        this.rechargeType = plan.type;
        this.data = plan.data;
        this.talkTime = plan.talkTime;
    }
}

export class PlanResponse {
    @ApiProperty()
    operatorId: string;

    @ApiProperty()
    circleId: string;

    @ApiProperty({
        description: 'Plans grouped by recharge type',
        type: Object
    })
    plans: Record<string, PlanDto[]>;

    constructor(planInfo: IPlan[], operatorId: string, circleId: string) {
        this.operatorId = operatorId;
        this.circleId = circleId;
        this.plans = planInfo.reduce((acc, plan) => {
            const rechargeType = getRechargeFullForm(plan.type);
            if (!acc[rechargeType]) {
                acc[rechargeType] = [];
            }
            acc[rechargeType].push(new PlanDto(plan));
            return acc;
        }, {} as Record<string, PlanDto[]>);
    }
}

export class PlanRequestDto {
    @ApiProperty()
    operatorId: string;
    @ApiProperty()
    circleCode: string;
}
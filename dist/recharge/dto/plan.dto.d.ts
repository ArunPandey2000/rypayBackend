import { IPlan } from "src/integration/a1topup/external/interfaces/recharge-plans-api-response.interface";
declare class PlanDto {
    price: number;
    duration: string;
    detail: string;
    rechargeType: string;
    data: string;
    talkTime: string;
    constructor(plan: IPlan);
}
export declare class PlanResponse {
    operatorId: string;
    circleId: string;
    plans: Record<string, PlanDto[]>;
    constructor(planInfo: IPlan[], operatorId: string, circleId: string);
}
export declare class PlanRequestDto {
    operatorId: string;
    circleCode: string;
}
export {};

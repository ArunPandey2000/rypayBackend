import { PlanLimit } from "./plan-limit.entity";
export declare class Plan {
    id: string;
    name: string;
    price: number;
    duration: number;
    created_at: Date;
    updated_at: Date;
    limits: PlanLimit[];
}

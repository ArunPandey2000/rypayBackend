export interface IRechargePlanApiResponse {
    status: "SUCCESS" | "FAILED";
    planData: IPlan[];
}
export interface IPlan {
    amount: number;
    validity: string;
    detail: string;
    talkTime: string;
    data: string;
    stateId: string;
    operatorId: string;
    type: string;
}

import { IOperatorInfo } from "src/integration/a1topup/external/interfaces/operator-response.interface";
export declare class ProviderInfo {
    operatorName: string;
    operatorId: string;
    serviceType: string;
    constructor(provider: IOperatorInfo);
}
export declare class ProviderInfoResponse {
    data: ProviderInfo;
}

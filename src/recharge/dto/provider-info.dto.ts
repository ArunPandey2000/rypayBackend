import { ApiProperty } from "@nestjs/swagger";
import { IOperatorInfo } from "src/integration/a1topup/external/interfaces/operator-response.interface";

export class ProviderInfo {
    @ApiProperty()
    operatorName: string;
    @ApiProperty()
    operatorId: string;
    @ApiProperty()
    serviceType: string
    constructor(provider: IOperatorInfo) {
        this.operatorName =  provider.name;
        this.operatorId = provider.operatorId;
        this.serviceType = provider.serviceType;
    }
}
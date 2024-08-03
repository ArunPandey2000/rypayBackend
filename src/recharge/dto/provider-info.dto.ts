import { ApiProperty } from "@nestjs/swagger";
import { IOperatorInfo } from "src/integration/a1topup/external/interfaces/operator-response.interface";

export class ProviderInfo {
    @ApiProperty()
    minimumAmount: number;
    @ApiProperty()
    maximumAmount: number;
    @ApiProperty()
    fetchBill: boolean;
    @ApiProperty()
    status: string;
    @ApiProperty()
    isBBPSEnabled: boolean;
    @ApiProperty()
    serviceType: string;
    @ApiProperty()
    operatorId: string;
    @ApiProperty()
    operatorName: string;
    @ApiProperty()
    message: string;
    @ApiProperty()
    description: string;
    constructor(provider: IOperatorInfo) {
        this.fetchBill = provider.bill_fetch !== "NO";
        this.isBBPSEnabled = provider.bbps_enabled !== "NO";
        this.status = provider.status;
        this.description = provider.description;
        this.operatorName = provider.operator_name;
        this.message = provider.message;
        this.operatorId = provider.operator_id;
        this.operatorName = provider.operator_name;
        this.maximumAmount = Number(provider.amount_maximum);
        this.minimumAmount = Number(provider.amount_minimum);
        this.serviceType = provider.service_type;
    }
}
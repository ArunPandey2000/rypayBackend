import { ApiProperty } from "@nestjs/swagger";

export class RechargeMetaDataResponse {
    @ApiProperty()
    providerName: string;

    @ApiProperty()
    providerCode: string;

    @ApiProperty()
    serviceType: string;
}
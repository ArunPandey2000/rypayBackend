import { ApiProperty } from "@nestjs/swagger";

export class MobileProviderInfo {
    @ApiProperty()
    operatorName: string
    @ApiProperty()
    operatorId: string
    @ApiProperty()
    circleName: string
    @ApiProperty()
    circleId: string
}
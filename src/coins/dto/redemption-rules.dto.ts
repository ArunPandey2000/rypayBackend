import { ApiProperty } from "@nestjs/swagger";

export class RedemptionRuleDto {
    @ApiProperty()
    id: string;
    @ApiProperty()
    requiredCoins: number;
    @ApiProperty()
    redemptionValue: number;
}

export class CoinsDto {
    @ApiProperty()
    availableCoins: number;
    @ApiProperty()
    amountRedeemed: number;
}
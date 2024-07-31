import { ApiProperty } from "@nestjs/swagger";

export class RechargeApiResponseDto {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    referenceId: string
}
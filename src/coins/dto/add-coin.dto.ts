import { ApiProperty } from "@nestjs/swagger";

export class AddCoinDto {
    @ApiProperty()
    amount: number
}
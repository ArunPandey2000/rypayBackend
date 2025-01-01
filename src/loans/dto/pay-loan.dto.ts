import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Min } from "class-validator";

export class PayloanDto {
    @ApiProperty()
    @IsNotEmpty()
    loanId: string

    @ApiProperty()
    @Min(0)
    amount: number;
}
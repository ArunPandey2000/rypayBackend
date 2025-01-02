import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, Min } from "class-validator";

export class PayloanDto {
    @ApiProperty()
    @IsNotEmpty()
    loanId: string

    @ApiProperty()
    @Min(0)
    amount: number;

    @ApiProperty()
    @IsOptional()
    remarks: string;
}
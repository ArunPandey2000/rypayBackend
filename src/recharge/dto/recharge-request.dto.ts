import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class RechargeRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    circleCode: string;

    @IsNotEmpty()
    @ApiProperty()
    operatorCode: string;

    @IsNotEmpty()
    @ApiProperty()
    accountNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    amount: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class ElectricityRechargeDto {
    @IsNotEmpty()
    @ApiProperty()
    operatorCode: string;
    
    rechargeType: string;

    @IsNotEmpty()
    @ApiProperty()
    accountNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    mobile: string;

    @IsNotEmpty()
    @ApiProperty()
    amount: number;
}
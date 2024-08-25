import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";

export class ElectricityRechargeDto {
    @IsNotEmpty()
    @ApiProperty()
    operatorCode: string;
    
    rechargeType: string;

    @IsNotEmpty()
    @ApiProperty()
    accountNumber: string;

    @ApiProperty()
    @IsOptional()
    message: string;

    @IsNotEmpty()
    @ApiProperty()
    mobile: string;

    @IsNotEmpty()
    @ApiProperty()
    amount: number;
}
import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsOptional } from "class-validator";
import { RechargeServiceTypes } from "../constants/recharge-metadata.constant";

export class RechargeRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsIn([RechargeServiceTypes.Mobile, RechargeServiceTypes.DTH])
    rechargeType: string;

    @IsNotEmpty()
    @ApiProperty()
    operatorCode: string;

    @ApiProperty()
    @IsOptional()
    message: string;

    @IsNotEmpty()
    @ApiProperty()
    accountNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    amount: number;
}
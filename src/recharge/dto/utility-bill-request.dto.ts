import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty } from "class-validator";

export class UtilityBillRequestDto {
    @IsNotEmpty()
    @ApiProperty()
    fetchBillReferenceId: string;

    @IsNotEmpty()
    @ApiProperty()
    operatorCode: string;

    @IsNotEmpty()
    @ApiProperty()
    accountNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    amount: number;

    @IsNotEmpty()
    @IsMobilePhone('en-IN')
    @ApiProperty()
    mobile: string;
}
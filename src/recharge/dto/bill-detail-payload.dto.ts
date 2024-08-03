import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty } from "class-validator";

export class BillPayloadDetail {
    @IsNotEmpty()
    @ApiProperty()
    accountNumber: string;

    @IsNotEmpty()
    @ApiProperty()
    operatorId: string;

    @IsMobilePhone('en-IN')
    @IsNotEmpty()
    @ApiProperty()
    mobile: string

    @ApiProperty()
    @IsNotEmpty()
    sessionId: string
}
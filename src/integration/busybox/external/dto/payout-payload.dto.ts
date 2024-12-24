import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsMobilePhone, IsNotEmpty } from "class-validator"

export class AccountPayoutPayload {
    @ApiProperty()
    @IsNotEmpty()
    accountNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    ifsc: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone('en-IN')
    mobile: string

    @ApiProperty()
    @IsNotEmpty()
    @IsIn(['IMPS', 'RTGS', 'NEFT'])
    mode: string
}

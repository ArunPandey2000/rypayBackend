import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone, IsNotEmpty } from "class-validator";

export class UPIPayoutPayload {
    @ApiProperty()
    @IsNotEmpty()
    upiId: string;

    @ApiProperty()
    @IsNotEmpty()
    amount: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsMobilePhone('en-IN')
    mobile: string

    @ApiProperty()
    message: string
}
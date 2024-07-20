import { ApiProperty } from "@nestjs/swagger";
import { IsMobilePhone } from "class-validator";

export class sendOtpRequestDto {
    @ApiProperty()
    @IsMobilePhone('en-IN')
    phone: string;
}
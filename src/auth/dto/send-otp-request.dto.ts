import { ApiProperty } from "@nestjs/swagger";
import { IsPhoneNumber } from "class-validator";

export class sendOtpRequestDto {
    @ApiProperty({description: 'phone number of user'})
    @IsPhoneNumber('IN')
    phone: string;
}
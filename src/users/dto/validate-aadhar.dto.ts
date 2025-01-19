import { ApiProperty } from "@nestjs/swagger";

export class ValidateAadharDto {
    @ApiProperty()
    aadharNumber: string

    @ApiProperty()
    otp: string
}
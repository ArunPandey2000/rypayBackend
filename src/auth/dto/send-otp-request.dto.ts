import { ApiProperty } from "@nestjs/swagger";

export class sendOtpRequestDto {
    @ApiProperty()
    phone: string;
}
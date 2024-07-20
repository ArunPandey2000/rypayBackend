import { ApiProperty } from "@nestjs/swagger";

export class sendOtpResponse {
    @ApiProperty()
    message: string;
}
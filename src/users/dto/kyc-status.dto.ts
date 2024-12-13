import { ApiProperty } from "@nestjs/swagger";

export class KycVerificationStatusResponse {
    @ApiProperty()
    status: string
}
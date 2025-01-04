import { ApiProperty } from "@nestjs/swagger";

export class PayoutResponseDTO {
    @ApiProperty()
    message: string

    @ApiProperty()
    amount: number

    @ApiProperty()
    referenceId: string
}
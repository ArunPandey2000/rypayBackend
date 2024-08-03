import { ApiProperty } from "@nestjs/swagger";

export class BillPaymentResponse {
    @ApiProperty()
    amount: number;

    @ApiProperty()
    referenceId: string
}
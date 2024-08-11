import { ApiProperty } from "@nestjs/swagger";

export class RechargeTransactionPayloadDto {
    @ApiProperty({description: `'SUCCESS' | 'FAILED' | 'DISPUTED' | 'PENDING'`})
    status: 'SUCCESS' | 'FAILED' | 'DISPUTED' | 'PENDING';  // Status of the transaction
    @ApiProperty()
    orderId: string;      // Order ID in our system
    @ApiProperty()
    urid: string;         // Your system's unique ID
    @ApiProperty()
    transId: string;      // Operator transaction ID
    @ApiProperty()
    creditused: string;   // Credit used for the transaction
}
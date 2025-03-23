import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, Min } from "class-validator";

export class PaymentRequestDto {
    @IsNumber()
    @Min(0)
    @ApiProperty()
    amount: number;
    @ApiProperty()
    message: string;
}
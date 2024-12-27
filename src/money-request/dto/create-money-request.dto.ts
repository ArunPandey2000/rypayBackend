import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateMoneyRequestDto {
    @ApiProperty()
    @IsDateString()
    paidAt: Date;
    
    @ApiProperty()
    @IsNotEmpty()
    modeOfPayment: string;

    @ApiProperty()
    @IsNotEmpty()
    UTR: string;

    @ApiProperty()
    @IsNumber({}, { message: 'Amount must be a number.' })
    @Min(0.01, { message: 'Amount must be greater than 0.' })
    paidAmount: number;
}

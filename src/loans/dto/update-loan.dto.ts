import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateLoanDto } from './create-loan.dto';
import { IsNumber } from 'class-validator';

export class UpdateLoanDto extends PartialType(CreateLoanDto) {
    @IsNumber()
    @ApiProperty({
        description: 'payment done by user',
        example: 50000,
    })
    paymentAmount: number = 0;
}

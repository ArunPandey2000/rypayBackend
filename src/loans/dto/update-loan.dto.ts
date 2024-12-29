import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateLoanDto {
    @ApiProperty()
    @IsIn(['Pending', 'PartiallyPaid', 'Paid'])
    loanStatus: 'Pending' | 'PartiallyPaid' | 'Paid'

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    overdueAmount: number

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    installmentAmount: number
}

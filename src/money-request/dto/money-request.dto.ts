import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsOptional, IsString, ValidateIf } from "class-validator";
import { MoneyRequest } from "src/core/entities/money-request.entity";
import { PaginationRequestDto } from "src/transactions/dto/get-transactions.dto";
import { SORT_DIRECTIONS } from "src/transactions/enum/sort-direction.enum";
import { MoneyRequestStatuses } from "../constants/account-details.constant";

export class MoneyRequestResponseDto {
    @ApiProperty()
    isSuccess: boolean
}

export class MoneyRequestQueryDto {
    
    @IsOptional()
    @ApiPropertyOptional()
    pagination: PaginationRequestDto
  
    @ValidateIf(o => o.fromDate !== undefined && o.fromDate !== '')
    @IsDateString()
    @ApiPropertyOptional()
    fromDate: string;
  
    @ApiPropertyOptional()
    @ValidateIf(o => o.toDate !== undefined && o.toDate !== '')
    @IsDateString()
    @IsOptional()
    toDate: string;
  
    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    search: string;
  
    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(SORT_DIRECTIONS)
    sortDirection: SORT_DIRECTIONS;
  

    @ValidateIf(o => o.status !== undefined && o.status !== '')
    @IsOptional()
    status: MoneyRequestStatuses;
}

export class MoneyRequestDto {

    @ApiProperty()
    paidAt: Date;

    @ApiProperty()
    modeOfPayment: string;

    @ApiProperty()
    UTR: string;

    @ApiProperty()
    paidAmount: number;

    @ApiProperty()
    status: 'Requested' | 'Rejected' | 'Paid';

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    userId: string

    @ApiProperty()
    profile: any

    constructor(data: MoneyRequest) {
        this.UTR = data.UTR;
        this.createdAt = data.createdAt;
        this.modeOfPayment = data.modeOfPayment;
        this.paidAmount = data.paidAmount;
        this.status = data.status;
        this.updatedAt = data.updatedAt;
        this.userId = data.user.id;
        this.profile = {
            name: `${data.user?.firstName} ${data.user?.lastName}`,
            phone: data.user.phoneNumber
        }
    }
}
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString } from "class-validator";
import { SORT_DIRECTIONS } from "../enum/sort-direction.enum";
import { TransactionType } from "../enum/transaction-type.enum";

export class PaginationRequestDto {
    @IsNumber()
    @ApiProperty()
    page: number;
  
    @IsNumber()
    @ApiProperty()
    pageSize: number;
  }

export class TransactionQueryDto {
    
    @IsOptional()
    @ApiPropertyOptional()
    pagination: PaginationRequestDto
  
    @IsDateString()
    @ApiPropertyOptional()
    @IsOptional()
    fromDate: string;
  
    @IsDateString()
    @ApiPropertyOptional()
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
  
    @IsString()
    @ApiPropertyOptional()
    @IsOptional()
    @IsEnum(TransactionType)
    transactionType: TransactionType;
  }
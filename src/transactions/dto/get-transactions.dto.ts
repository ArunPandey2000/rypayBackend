import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, Min, ValidateIf } from "class-validator";
import { SORT_DIRECTIONS } from "../enum/sort-direction.enum";
import { TransactionType } from "../enum/transaction-type.enum";

export class PaginationRequestDto {
    @IsNumber()
    @ApiProperty()
    @Min(1)
    page: number;
  
    @IsNumber()
    @ApiProperty()
    pageSize: number;
  }

export class TransactionQueryDto {
    
    @IsOptional()
    @ApiPropertyOptional()
    pagination: PaginationRequestDto
  
    @ValidateIf(o => o.fromDate !== undefined && o.fromDate !== '')
    @IsDateString()
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
  

    @ValidateIf(o => o.transactionType !== undefined && o.transactionType !== '')
    @IsOptional()
    @IsEnum(TransactionType)
    transactionType: TransactionType;
}

export class PrintableTransactionQueryDto {
    
  @IsOptional()
  @ApiPropertyOptional()
  pagination: PaginationRequestDto

  @ApiProperty()
  @IsDateString()
  fromDate: string;

  @ApiProperty()
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


  @ValidateIf(o => o.transactionType !== undefined && o.transactionType !== '')
  @IsOptional()
  @IsEnum(TransactionType)
  transactionType: TransactionType;
}
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsBoolean, IsDateString } from 'class-validator';

export enum PaymentStatus {
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
}

export enum PaymentType {
  Credit = 'Credit',
  Debit = 'Debit',
}

export class TransactionDataDto {
  @ApiProperty({ example: 'TEBPTR0016' })
  @IsString()
  transcation_id: string;

  @ApiProperty({ example: 'sathyaTest-1706550855' })
  @IsString()
  reference_id: string;

  @ApiProperty({ example: 'TEBPOD0015' })
  @IsString()
  order_id: string;

  @ApiProperty({ example: '9378738535' })
  @IsString()
  account_number: string;

  @ApiProperty({ example: 'UTIB0CCH274' })
  @IsString()
  ifsc: string;

  @ApiProperty({ example: 'sathya@ybl' })
  @IsString()
  upi: string;

  @ApiProperty({ example: 6 })
  @IsNumber()
  amount: number;

  @ApiProperty({ example: 'UPI' })
  @IsString()
  payment_mode: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  payment_remark: string;

  @ApiProperty({ example: 'Collected Successfully' })
  @IsString()
  statusDescription: string;

  @ApiProperty({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ example: '242424242424' })
  @IsString()
  utr: string;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  holderName: string;

  @ApiProperty({ enum: PaymentType })
  @IsEnum(PaymentType)
  type: PaymentType;

  @ApiProperty({ example: 0 })
  @IsNumber()
  charge: number;

  @ApiProperty({ example: 0 })
  @IsNumber()
  gst: number;

  @ApiProperty({ example: '2024-01-29T17:54:41.849Z' })
  @IsDateString()
  createdAt: string;

  @ApiProperty({ example: '2024-01-29T17:54:42.455Z' })
  @IsDateString()
  updatedAt: string;
}

export class TransactionDto {
  @ApiProperty({ example: true })
  @IsBoolean()
  status: boolean;

  @ApiProperty({ example: 200 })
  @IsNumber()
  statusCode: number;

  @ApiProperty({ type: TransactionDataDto })
  data: TransactionDataDto;

  @ApiProperty({ example: '' })
  @IsString()
  @IsOptional()
  message: string;

  @ApiProperty({ example: 'DYNAMIC_UPI_COLLECTION' })
  @IsString()
  event: string;
}

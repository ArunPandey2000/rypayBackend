import { IsBoolean, IsInt, IsString, IsObject, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PaymentDataDto {
  @IsString()
  @ApiProperty()
  paymentType: string;

  @IsString()
  @ApiProperty()
  amount: string;

  @IsString()
  @ApiProperty()
  merchantReferenceId: string;

  @IsString()
  @ApiProperty()
  successDate: string;

  @IsString()
  @ApiProperty()
  UTR: string;

  @IsString()
  @ApiProperty()
  payerName: string;

  @IsString()
  @ApiProperty()
  payeeUPI: string;
}

export class WebhookPaymentRequestDto {
  @IsBoolean()
  @ApiProperty()
  status: boolean;

  @IsInt()
  @ApiProperty()
  statusCode: number;

  @IsString()
  @ApiProperty()
  txnStatus: string;

  @IsString()
  @ApiProperty()
  msg: string;

  @IsOptional()
  @IsObject()
  @ApiProperty()
  @Type(() => PaymentDataDto)
  data?: PaymentDataDto;
}
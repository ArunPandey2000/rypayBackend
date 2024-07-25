import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MerchantRequestDto {
  @IsNotEmpty()
  @ApiProperty()
  shopName: string;

  @ApiProperty()
  gstNumber: string;

  @ApiProperty()
  msmeNumber: string;
}

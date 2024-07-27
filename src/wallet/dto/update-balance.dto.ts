import { ApiProperty } from '@nestjs/swagger';

export class UpdateBalanceDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  txnDescription: string;
}

export class initiatePaymentDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  wallet_id: string;

  @ApiProperty()
  transactionDescription: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  state: string;
}

export class paymentCallbackDto {
  @ApiProperty()
  response: any;
}

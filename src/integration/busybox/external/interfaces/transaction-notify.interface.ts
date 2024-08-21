import { ApiProperty } from "@nestjs/swagger";

export class TransactionNotifyPayload {
  @ApiProperty()
  rootCardId: string;
  @ApiProperty()
  rootCustomerId: string;
  @ApiProperty()
  cardId: string;
  @ApiProperty()
  cardProgramId: string;
  @ApiProperty()
  orgId: string;
  @ApiProperty()
  customerId: string;
  @ApiProperty()
  cardHolderMobile: string;
  @ApiProperty()
  txnStatus: string;
  @ApiProperty()
  txnCategory: string;
  @ApiProperty()
  txnAmount: string;
  @ApiProperty()
  balanceAmount: string;
  @ApiProperty()
  txnFee: string;
  @ApiProperty()
  eventId: string;
}

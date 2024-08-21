import { ApiProperty } from "@nestjs/swagger";

export class KycWebhookPayload {
  @ApiProperty()
  cardholderId: string;
  @ApiProperty()
  kycType: string;
  @ApiProperty()
  issuerCode: string;
  @ApiProperty()
  kycStatus: string;
  @ApiProperty()
  eventId: string;
  @ApiProperty()
  errorCode?: string;
  @ApiProperty()
  errorMessage?: string;
}

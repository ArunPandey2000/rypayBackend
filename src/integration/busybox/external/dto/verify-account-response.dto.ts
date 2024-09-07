import { ApiProperty } from '@nestjs/swagger';

export class VerifyAccountResponseDTO {
  @ApiProperty({ description: 'Response message', example: 'Request Complete' })
  message: string;

  @ApiProperty({ description: 'Account number', example: '77770116860112' })
  accountNumber: string;

  @ApiProperty({ description: 'IFSC code', example: 'FDRL0007777' })
  ifscCode: string;

  @ApiProperty({ description: 'Name of the account holder in the bank', example: 'John Doe' })
  nameInBank: string;
}

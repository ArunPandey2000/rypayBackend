import { ApiProperty } from '@nestjs/swagger';

export class VerifyAccountRequestDTO {
  @ApiProperty({
    description: 'The account number to be verified',
    example: '77770116860112',
  })
  accountNumber: string;

  @ApiProperty({
    description: 'The IFSC code of the bank',
    example: 'FDRL0007777',
  })
  ifscCode: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class VerifyUpiRequestDTO {

  @ApiProperty({
    description: 'The upi id issued by bank',
    example: '1234@okaxis,...',
  })
  upiId: string;
}

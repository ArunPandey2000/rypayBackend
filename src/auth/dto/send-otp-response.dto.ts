import { ApiProperty } from '@nestjs/swagger';

export class sendOtpResponseDto {
  @ApiProperty()
  message: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class RefreshAccessTokenRequestDto {
  @ApiProperty()
  refreshToken: string;
}

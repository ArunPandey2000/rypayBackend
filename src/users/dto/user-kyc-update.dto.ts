import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { KycVerificationStatus } from 'src/core/enum/kyc-verification-status.enum';

export class UpdateKycStatusDto {
  @ApiProperty()
  @IsEnum(KycVerificationStatus)
  verificationStatus: KycVerificationStatus;
}

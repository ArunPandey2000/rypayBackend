import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { FileType } from 'src/core/enum/file-type.enum';

export class UpdateKycDetailUploadDto {
  @ApiProperty()
  @IsMobilePhone('en-IN')
  phoneNumber: string;

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @IsEnum(FileType)
  docType: FileType;
}

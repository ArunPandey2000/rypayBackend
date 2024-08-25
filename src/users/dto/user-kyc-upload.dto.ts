import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { FileType } from 'src/core/enum/file-type.enum';

export class UpdateKycDetailUploadDto {
  @ApiProperty()
  @IsMobilePhone('en-IN')
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  fileKey: string;

  @IsNotEmpty()
  description: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the document',
    enum: FileType,

  })
  @IsEnum(FileType)
  docType: FileType;
}

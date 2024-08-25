import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { FileType } from 'src/core/enum/file-type.enum';

export class UpdateKycDetailUploadDto {

  @ApiProperty()
  @IsNotEmpty()
  fileKey: string;

  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @ApiProperty({
    description: 'The type of the document',
    enum: FileType,
  })
  @IsEnum(FileType)
  docType: FileType;
}

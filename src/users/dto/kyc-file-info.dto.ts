import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { FileType } from "src/core/enum/file-type.enum";

export class UserKYCDocumentInfo {
  @ApiProperty()
  phoneNumber: string;
  @ApiProperty()
  description: string;
  @ApiProperty({
    description: 'The type of the document',
    enum: FileType,

  })
  @IsEnum(FileType)
  docType: FileType;
  @ApiProperty({ type: 'string', format: 'binary' })
  file: Express.Multer.File;

}

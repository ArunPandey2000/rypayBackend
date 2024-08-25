import { ApiProperty } from "@nestjs/swagger";
import { UserDocument } from "src/core/entities/document.entity";

export class UserDocumentResponseDto {
    @ApiProperty()
    url: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    documentType: string;

    @ApiProperty()
    createdDate: Date;

    constructor(doc: UserDocument) {
        this.description = doc.description;
        this.documentType = doc.documentType;
        this.createdDate = doc.createdDate;
        this.url = doc.documentUrl;
    }
}
import { UserDocument } from "src/core/entities/document.entity";
export declare class UserDocumentResponseDto {
    url: string;
    description: string;
    documentType: string;
    createdDate: Date;
    constructor(doc: UserDocument);
}

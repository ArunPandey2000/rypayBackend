import { User } from './user.entity';
export declare class UserDocument {
    id: number;
    documentType: string;
    documentUrl: string;
    description: string;
    createdDate: Date;
    user: User;
    addCreatedDate(): void;
}

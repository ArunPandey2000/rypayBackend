import { User } from './user.entity';
export declare class Beneficiary {
    id: number;
    nameInBank: string;
    user: User;
    bankAccountNumber: string;
    ifscCode: string;
}

import { User } from "src/core/entities/user.entity";

export class CardCreationDto {
    cardNumber: string;
    status: string;
    user: User
}
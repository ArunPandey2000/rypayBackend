import { User } from "./user.entity";
import { KitNumber } from "./kit-number.entity";
export declare enum CardStatus {
    InActive = "inactive",
    Active = "active",
    Locked = "locked"
}
export declare class Card {
    id: number;
    user: User;
    cardNumber: string;
    kitNumber: KitNumber;
    lastFourDigits: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
}

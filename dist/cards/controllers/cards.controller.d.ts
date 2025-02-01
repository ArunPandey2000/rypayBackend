import { CardsService } from '../services/cards.service';
export declare class CardsController {
    private cardsService;
    constructor(cardsService: CardsService);
    requestPhysicalCard(phone: string): Promise<{
        data: import("../../integration/busybox/external/interfaces/card-assignment.interface").CardAssignmentResponse;
        statusCode: number;
    }>;
    lockUnlockCard(req: any, cardStatus: boolean): Promise<{
        data: import("../../integration/busybox/external/interfaces/lock-unlock.interface").CardLockResponse;
        statusCode: number;
    }>;
}

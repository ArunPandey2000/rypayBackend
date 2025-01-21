import { ConfigService } from '@nestjs/config';
import { Card } from 'src/core/entities/card.entity';
import { KitNumber } from 'src/core/entities/kit-number.entity';
import { User } from 'src/core/entities/user.entity';
import { CardsClientService } from 'src/integration/busybox/external-system-client/cards-client.service';
import { QueryRunner, Repository } from 'typeorm';
import { CardCreationDto } from '../dto/card-creation-info.dto';
export declare class CardsService {
    private cardsClientService;
    private configService;
    private cardRepository;
    private kitNumberRepo;
    private userRepo;
    constructor(cardsClientService: CardsClientService, configService: ConfigService, cardRepository: Repository<Card>, kitNumberRepo: Repository<KitNumber>, userRepo: Repository<User>);
    requestPhysicalCard(phone: string): Promise<import("src/integration/busybox/external/interfaces/card-assignment.interface").CardAssignmentResponse>;
    lockUnlockCard(userId: string, cardStatus: boolean): Promise<import("src/integration/busybox/external/interfaces/lock-unlock.interface").CardLockResponse>;
    createCardAndAssignKitNumberToUser(cardInfo: CardCreationDto, queryRunner: QueryRunner): Promise<Card>;
    activateUserCard(userId: string): Promise<Card>;
}

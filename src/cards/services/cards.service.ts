import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Card, CardStatus } from 'src/core/entities/card.entity';
import { KitNumber } from 'src/core/entities/kit-number.entity';
import { User } from 'src/core/entities/user.entity';
import { CardsClientService } from 'src/integration/busybox/external-system-client/cards-client.service';
import { CardAssignmentDto } from 'src/integration/busybox/external/interfaces/card-assignment.interface';
import { QueryRunner, Repository } from 'typeorm';
import { CardCreationDto } from '../dto/card-creation-info.dto';
import { CardLockDto } from 'src/integration/busybox/external/interfaces/lock-unlock.interface';

@Injectable()
export class CardsService {

    constructor(
        private cardsClientService: CardsClientService,
        private configService: ConfigService,
        @InjectRepository(Card) private cardRepository: Repository<Card>,
        @InjectRepository(Card) private kitNumberRepo: Repository<KitNumber>,
        @InjectRepository(Card) private userRepo: Repository<User>,
    ) {

    }

    async requestPhysicalCard(phone: string) {
        const user = await this.userRepo.findOne({where: {phoneNumber: phone}, relations: {card: true}});
        if (!user) {
            throw new BadRequestException('User with given phone number does not exist');
        }
        const kitNumberData = user.card.kitNumber;
        const assignCardDto: CardAssignmentDto = {
            mobile_number: phone,
            orgId: this.configService.get('BUSY_BOX_ORG_ID'),
            kitNumber: kitNumberData.kitNumber // will assign a kit number to each user
        }
        const cardData = await this.cardsClientService.assignCard(assignCardDto);
        if (cardData.statusCode === 'S0200') {
            const cardEntity = user.card;
            cardEntity.status = CardStatus.Active;
            await this.cardRepository.update({user: {id: user.id}}, user.card);
        }
        return cardData
    }

    async lockUnlockCard(userId: string, cardStatus: boolean) {
        const user = await this.userRepo.findOne({where: {id: userId}, relations: {card: true}});
        if (!user) {
            throw new BadRequestException('User with given phone number does not exist');
        }
        const card = user.card;
        const assignCardDto: CardLockDto = {
            cardId: card.cardNumber,
            lock:  cardStatus
        }
        const lockCardResponse = await this.cardsClientService.lockCard(assignCardDto);
            const cardEntity = user.card;
            cardEntity.status = cardStatus ? CardStatus.Active : CardStatus.InActive;
            await this.cardRepository.update({user: {id: user.id}}, user.card);
        return lockCardResponse;
    }

    async createCardAndAssignKitNumberToUser(cardInfo: CardCreationDto, queryRunner: QueryRunner) {
        const card = this.cardRepository.create(cardInfo);
        const kitNumber = await this.kitNumberRepo.findOne({where: {
            isAssigned: false
        }});
        card.kitNumber = kitNumber;
        card.lastFourDigits = kitNumber.lastFourDigits;
        kitNumber.isAssigned = true;
        await queryRunner.manager.save(kitNumber);
        return queryRunner.manager.save(card);
    }
}

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("../../core/entities/card.entity");
const kit_number_entity_1 = require("../../core/entities/kit-number.entity");
const cards_client_service_1 = require("../../integration/busybox/external-system-client/cards-client.service");
const typeorm_2 = require("typeorm");
let CardsService = class CardsService {
    constructor(cardsClientService, configService, cardRepository, kitNumberRepo, userRepo) {
        this.cardsClientService = cardsClientService;
        this.configService = configService;
        this.cardRepository = cardRepository;
        this.kitNumberRepo = kitNumberRepo;
        this.userRepo = userRepo;
    }
    async requestPhysicalCard(phone) {
        const user = await this.userRepo.findOne({ where: { phoneNumber: phone }, relations: { card: true } });
        if (!user) {
            throw new common_1.BadRequestException('User with given phone number does not exist');
        }
        const kitNumberData = user.card.kitNumber;
        const assignCardDto = {
            mobile_number: phone,
            orgId: this.configService.get('BUSY_BOX_ORG_ID'),
            kitNumber: kitNumberData.kitNumber
        };
        const cardData = await this.cardsClientService.assignCard(assignCardDto);
        if (cardData.statusCode === 'S0200') {
            const cardEntity = user.card;
            cardEntity.status = card_entity_1.CardStatus.Active;
            await this.cardRepository.update({ user: { id: user.id } }, user.card);
        }
        return cardData;
    }
    async lockUnlockCard(userId, cardStatus) {
        const user = await this.userRepo.findOne({ where: { id: userId }, relations: { card: true } });
        if (!user) {
            throw new common_1.BadRequestException('User with given phone number does not exist');
        }
        const card = user.card;
        const assignCardDto = {
            cardId: card.cardNumber,
            lock: cardStatus
        };
        const lockCardResponse = await this.cardsClientService.lockCard(assignCardDto);
        const cardEntity = user.card;
        cardEntity.status = cardStatus ? card_entity_1.CardStatus.Active : card_entity_1.CardStatus.InActive;
        await this.cardRepository.update({ user: { id: user.id } }, user.card);
        return lockCardResponse;
    }
    async createCardAndAssignKitNumberToUser(cardInfo, queryRunner) {
        const card = this.cardRepository.create(cardInfo);
        const isSandBox = JSON.parse(this.configService.get('ENABLE_SANDBOX'));
        const kitNumber = await queryRunner.manager.findOne(kit_number_entity_1.KitNumber, {
            where: {
                isAssigned: false,
                ...(isSandBox ? { kitNumber: (0, typeorm_2.Like)('K%') } : {})
            }
        });
        card.kitNumber = kitNumber;
        card.lastFourDigits = kitNumber.lastFourDigits;
        kitNumber.isAssigned = true;
        await queryRunner.manager.save(kitNumber);
        return queryRunner.manager.save(card);
    }
    async activateUserCard(userId) {
        const card = await this.cardRepository.findOne({ where: { user: { id: userId } } });
        if (card) {
            card.status = card_entity_1.CardStatus.Active;
            await this.cardRepository.save(card);
        }
        else {
            throw new common_1.BadRequestException('user does not have card associated with him');
        }
        return card;
    }
};
exports.CardsService = CardsService;
exports.CardsService = CardsService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __param(3, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __param(4, (0, typeorm_1.InjectRepository)(card_entity_1.Card)),
    __metadata("design:paramtypes", [cards_client_service_1.CardsClientService,
        config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], CardsService);
//# sourceMappingURL=cards.service.js.map
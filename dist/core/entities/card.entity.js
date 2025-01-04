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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Card = exports.CardStatus = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const kit_number_entity_1 = require("./kit-number.entity");
var CardStatus;
(function (CardStatus) {
    CardStatus["InActive"] = "inactive";
    CardStatus["Active"] = "active";
    CardStatus["Locked"] = "locked";
})(CardStatus || (exports.CardStatus = CardStatus = {}));
let Card = class Card {
};
exports.Card = Card;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Card.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, user => user.card),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Card.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "cardNumber", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => kit_number_entity_1.KitNumber),
    (0, typeorm_1.JoinColumn)({ name: 'kitNumberId' }),
    __metadata("design:type", kit_number_entity_1.KitNumber)
], Card.prototype, "kitNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Card.prototype, "lastFourDigits", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: CardStatus, default: CardStatus.InActive }),
    __metadata("design:type", String)
], Card.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Card.prototype, "updatedAt", void 0);
exports.Card = Card = __decorate([
    (0, typeorm_1.Entity)()
], Card);
//# sourceMappingURL=card.entity.js.map
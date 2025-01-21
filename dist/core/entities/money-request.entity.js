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
exports.MoneyRequest = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let MoneyRequest = class MoneyRequest {
};
exports.MoneyRequest = MoneyRequest;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], MoneyRequest.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], MoneyRequest.prototype, "paidAt", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], MoneyRequest.prototype, "modeOfPayment", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], MoneyRequest.prototype, "UTR", void 0);
__decorate([
    (0, typeorm_1.Column)('decimal', { precision: 10, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], MoneyRequest.prototype, "paidAmount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: ['Requested', 'Rejected', 'Paid'], default: 'Requested' }),
    __metadata("design:type", String)
], MoneyRequest.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.moneyRequest, { onDelete: 'CASCADE', eager: true }),
    __metadata("design:type", user_entity_1.User)
], MoneyRequest.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], MoneyRequest.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], MoneyRequest.prototype, "updatedAt", void 0);
exports.MoneyRequest = MoneyRequest = __decorate([
    (0, typeorm_1.Entity)('moneyRequest')
], MoneyRequest);
//# sourceMappingURL=money-request.entity.js.map
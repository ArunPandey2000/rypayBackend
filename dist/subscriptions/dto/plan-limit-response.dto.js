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
exports.PlanLimitResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class PlanLimitResponseDto {
    constructor(planLimit) {
        this.transactionType = planLimit.transactionType;
        this.perTransactionLimit = planLimit.perTransactionLimit;
        this.dailyLimit = planLimit.dailyLimit;
        this.monthlyLimit = planLimit.monthlyLimit;
    }
}
exports.PlanLimitResponseDto = PlanLimitResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UPI' }),
    __metadata("design:type", String)
], PlanLimitResponseDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: null, nullable: true }),
    __metadata("design:type", Number)
], PlanLimitResponseDto.prototype, "perTransactionLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10000 }),
    __metadata("design:type", Number)
], PlanLimitResponseDto.prototype, "dailyLimit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100000 }),
    __metadata("design:type", Number)
], PlanLimitResponseDto.prototype, "monthlyLimit", void 0);
//# sourceMappingURL=plan-limit-response.dto.js.map
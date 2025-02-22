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
exports.PlanResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const plan_limit_response_dto_1 = require("./plan-limit-response.dto");
class PlanResponseDto {
    constructor(plan) {
        this.id = plan.id;
        this.name = plan.name;
        this.price = plan.price;
        this.durationInDays = plan.duration;
        this.limits = plan.limits.map((limit) => new plan_limit_response_dto_1.PlanLimitResponseDto(limit));
    }
}
exports.PlanResponseDto = PlanResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'a7d3117c-0b0b-4756-afa7-adb1b55bedd5' }),
    __metadata("design:type", String)
], PlanResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basic Plan' }),
    __metadata("design:type", String)
], PlanResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 249 }),
    __metadata("design:type", Number)
], PlanResponseDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 30 }),
    __metadata("design:type", Number)
], PlanResponseDto.prototype, "durationInDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Basic plan with enhanced limits.' }),
    __metadata("design:type", String)
], PlanResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [plan_limit_response_dto_1.PlanLimitResponseDto] }),
    __metadata("design:type", Array)
], PlanResponseDto.prototype, "limits", void 0);
//# sourceMappingURL=plan-response.dto.js.map
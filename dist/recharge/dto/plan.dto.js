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
exports.PlanRequestDto = exports.PlanResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
const recharge_plan_type_mapper_constant_1 = require("../constants/recharge-plan-type-mapper.constant");
class PlanDto {
    constructor(plan) {
        this.price = plan.amount;
        this.duration = plan.validity;
        this.detail = plan.detail;
        this.rechargeType = plan.type;
        this.data = plan.data;
        this.talkTime = plan.talkTime;
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The price of the plan' }),
    __metadata("design:type", Number)
], PlanDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The duration of the plan' }),
    __metadata("design:type", String)
], PlanDto.prototype, "duration", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The description of the plan' }),
    __metadata("design:type", String)
], PlanDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The type of the plan' }),
    __metadata("design:type", String)
], PlanDto.prototype, "rechargeType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The data available on the plan' }),
    __metadata("design:type", String)
], PlanDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The talktime available on the plan' }),
    __metadata("design:type", String)
], PlanDto.prototype, "talkTime", void 0);
class PlanResponse {
    constructor(planInfo, operatorId, circleId) {
        this.operatorId = operatorId;
        this.circleId = circleId;
        this.plans = planInfo.reduce((acc, plan) => {
            const rechargeType = (0, recharge_plan_type_mapper_constant_1.getRechargeFullForm)(plan.type);
            if (!acc[rechargeType]) {
                acc[rechargeType] = [];
            }
            acc[rechargeType].push(new PlanDto(plan));
            return acc;
        }, {});
    }
}
exports.PlanResponse = PlanResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlanResponse.prototype, "operatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlanResponse.prototype, "circleId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Plans grouped by recharge type',
        type: Object
    }),
    __metadata("design:type", Object)
], PlanResponse.prototype, "plans", void 0);
class PlanRequestDto {
}
exports.PlanRequestDto = PlanRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlanRequestDto.prototype, "operatorId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlanRequestDto.prototype, "circleCode", void 0);
//# sourceMappingURL=plan.dto.js.map
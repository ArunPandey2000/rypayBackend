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
exports.SubscriptionsController = void 0;
const common_1 = require("@nestjs/common");
const subscriptions_service_1 = require("./subscriptions.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const plan_response_dto_1 = require("./dto/plan-response.dto");
let SubscriptionsController = class SubscriptionsController {
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    async getAllPlansWithLimits() {
        return await this.subscriptionsService.findAllWithLimits();
    }
    async getPlanWithLimits(id) {
        return await this.subscriptionsService.findOneWithLimits(id);
    }
    async getUpgradeCost(req, body) {
        return this.subscriptionsService.calculateUpgradeCost(req.user.sub, body.newPlan);
    }
    async confirmUpgrade(body) {
        return this.subscriptionsService.upgradePlan(body.userId, body.newPlan);
    }
};
exports.SubscriptionsController = SubscriptionsController;
__decorate([
    (0, common_1.Get)('plans'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all plans with their limits.',
        type: [plan_response_dto_1.PlanResponseDto],
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getAllPlansWithLimits", null);
__decorate([
    (0, common_1.Get)('plan/:id'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get a specific plan with its limits.',
        type: plan_response_dto_1.PlanResponseDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'Plan not found.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getPlanWithLimits", null);
__decorate([
    (0, common_1.Post)('upgrade/cost'),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate Upgrade Cost',
        description: 'Calculate the cost required to upgrade a user to a new subscription plan.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Upgrade cost calculated successfully.',
        schema: {
            example: {
                userId: '12345',
                currentPlan: 'Free Plan',
                newPlan: 'Basic Plan',
                upgradeCost: 100,
            },
        },
    }),
    (0, swagger_1.ApiBody)({
        description: 'Provide the plan Id to calculate the upgrade cost.',
        schema: {
            type: 'object',
            properties: {
                newPlanId: { type: 'string', example: '321324121' },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getUpgradeCost", null);
__decorate([
    (0, common_1.Post)('upgrade/confirm'),
    (0, swagger_1.ApiOperation)({
        summary: 'Confirm Upgrade Plan',
        description: 'Confirm and perform the upgrade of a user to a new subscription plan.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Subscription upgraded successfully.',
        schema: {
            example: {
                userId: '12345',
                oldPlan: 'Free Plan',
                newPlan: 'Basic Plan',
                upgradeCost: 100,
                status: 'Success',
            },
        },
    }),
    (0, swagger_1.ApiBody)({
        description: 'Provide the user ID and the new plan to confirm the upgrade.',
        schema: {
            type: 'object',
            properties: {
                userId: { type: 'string', example: '12345' },
                newPlan: { type: 'string', example: 'Basic Plan' },
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "confirmUpgrade", null);
exports.SubscriptionsController = SubscriptionsController = __decorate([
    (0, swagger_1.ApiTags)('Subscriptions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_1.SubscriptionsService])
], SubscriptionsController);
//# sourceMappingURL=subscriptions.controller.js.map
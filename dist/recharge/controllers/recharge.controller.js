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
exports.RechargeController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const recharge_metadata_constant_1 = require("../constants/recharge-metadata.constant");
const bill_detail_payload_dto_1 = require("../dto/bill-detail-payload.dto");
const bill_response_dto_1 = require("../dto/bill-response.dto");
const circle_response_dto_1 = require("../dto/circle-response.dto");
const electricity_recharge_dto_1 = require("../dto/electricity-recharge.dto");
const plan_dto_1 = require("../dto/plan.dto");
const provider_info_dto_1 = require("../dto/provider-info.dto");
const recharge_request_dto_1 = require("../dto/recharge-request.dto");
const recharge_service_1 = require("../services/recharge.service");
let RechargeController = class RechargeController {
    constructor(rechargeService) {
        this.rechargeService = rechargeService;
    }
    async getServiceProviders(serviceId) {
        const data = await this.rechargeService.getServiceProvidersListByServiceId(serviceId);
        return {
            data
        };
    }
    getAvailableRechargeServices() {
        return this.rechargeService.getAvailableRechargeServices();
    }
    async getAllCircles() {
        const data = await this.rechargeService.getAllCircles();
        return {
            data
        };
    }
    rechargeUser(req, rechargeDto) {
        const userId = req.user.sub;
        return this.rechargeService.rechargeAccount(userId, rechargeDto);
    }
    payElectricityBill(req, rechargeDto) {
        const userId = req.user.sub;
        rechargeDto.rechargeType = recharge_metadata_constant_1.RechargeServiceTypes.Electricity;
        return this.rechargeService.rechargeAccount(userId, rechargeDto);
    }
    getBillDetails(billPayload) {
        return this.rechargeService.getBillDetails(billPayload);
    }
    getPlanDetails(planPayload) {
        return this.rechargeService.getPlans(planPayload.operatorId, planPayload.circleCode);
    }
};
exports.RechargeController = RechargeController;
__decorate([
    (0, common_1.Get)('/operators'),
    (0, swagger_1.ApiQuery)({ name: 'serviceId', required: false, description: 'get service providers by recharge service type' }),
    (0, swagger_1.ApiResponse)({ type: provider_info_dto_1.ProviderInfoResponse }),
    __param(0, (0, common_1.Query)('serviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "getServiceProviders", null);
__decorate([
    (0, common_1.Get)('/services'),
    (0, swagger_1.ApiResponse)({
        schema: {
            type: 'array',
            items: {
                type: 'string',
            },
        }
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "getAvailableRechargeServices", null);
__decorate([
    (0, common_1.Get)('/circle'),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Returns the list of all circles.',
        type: circle_response_dto_1.CircleApiResponseDto,
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RechargeController.prototype, "getAllCircles", null);
__decorate([
    (0, common_1.Post)('/prepaid-dth'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, recharge_request_dto_1.RechargeRequestDto]),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "rechargeUser", null);
__decorate([
    (0, common_1.Post)('/electricity'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, electricity_recharge_dto_1.ElectricityRechargeDto]),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "payElectricityBill", null);
__decorate([
    (0, common_1.Post)('/bill/details'),
    (0, swagger_1.ApiResponse)({ type: bill_response_dto_1.FetchBillResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bill_detail_payload_dto_1.BillPayloadDetail]),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "getBillDetails", null);
__decorate([
    (0, common_1.Post)('/plans'),
    (0, swagger_1.ApiResponse)({ type: plan_dto_1.PlanResponse }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [plan_dto_1.PlanRequestDto]),
    __metadata("design:returntype", void 0)
], RechargeController.prototype, "getPlanDetails", null);
exports.RechargeController = RechargeController = __decorate([
    (0, swagger_1.ApiTags)('Recharge'),
    (0, common_1.Controller)('recharge'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [recharge_service_1.RechargeService])
], RechargeController);
//# sourceMappingURL=recharge.controller.js.map
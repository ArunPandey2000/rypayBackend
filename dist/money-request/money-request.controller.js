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
exports.MoneyRequestController = void 0;
const common_1 = require("@nestjs/common");
const money_request_service_1 = require("./money-request.service");
const create_money_request_dto_1 = require("./dto/create-money-request.dto");
const swagger_1 = require("@nestjs/swagger");
const account_details_dto_1 = require("./dto/account-details.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const money_request_dto_1 = require("./dto/money-request.dto");
let MoneyRequestController = class MoneyRequestController {
    constructor(moneyRequestService) {
        this.moneyRequestService = moneyRequestService;
    }
    create(req, createMoneyRequestDto) {
        return this.moneyRequestService.create(req.user.sub, createMoneyRequestDto);
    }
    findAll(moneyRequestQuery) {
        return this.moneyRequestService.findAll(moneyRequestQuery);
    }
    getAccountDetails() {
        return this.moneyRequestService.getAccountDetails();
    }
    findOne(id) {
        return this.moneyRequestService.findOne(+id);
    }
    completeMoneyRequest(id, status) {
        return this.moneyRequestService.updateRequest(+id, status);
    }
};
exports.MoneyRequestController = MoneyRequestController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to create money request' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: money_request_dto_1.MoneyRequestResponseDto,
        description: 'Returns if money request completed.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_money_request_dto_1.CreateMoneyRequestDto]),
    __metadata("design:returntype", void 0)
], MoneyRequestController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('list'),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to get list of money request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [money_request_dto_1.MoneyRequestQueryDto]),
    __metadata("design:returntype", void 0)
], MoneyRequestController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('account-details'),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to create money request' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: [account_details_dto_1.AccountDetails],
        description: 'Returns if phone number exist.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], MoneyRequestController.prototype, "getAccountDetails", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to get money request detail' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: money_request_dto_1.MoneyRequestDto,
        description: 'Returns if phone number exist.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MoneyRequestController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)('complete/:id'),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to update money request status' }),
    (0, swagger_1.ApiResponse)({
        status: common_1.HttpStatus.OK,
        type: money_request_dto_1.MoneyRequestResponseDto,
        description: 'Returns if phone number exist.',
    }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], MoneyRequestController.prototype, "completeMoneyRequest", null);
exports.MoneyRequestController = MoneyRequestController = __decorate([
    (0, common_1.Controller)('money-request'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('Money-Request'),
    __metadata("design:paramtypes", [money_request_service_1.MoneyRequestService])
], MoneyRequestController);
//# sourceMappingURL=money-request.controller.js.map
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
exports.PayoutController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payout_payload_dto_1 = require("../dto/payout-payload.dto");
const payout_service_1 = require("../services/payout.service");
const jwt_auth_guard_1 = require("../../../../auth/guards/jwt-auth.guard");
const verify_account_response_dto_1 = require("../dto/verify-account-response.dto");
const verify_account_request_dto_1 = require("../dto/verify-account-request.dto");
const verify_upi_request_dto_1 = require("../dto/verify-upi-request.dto");
const upi_account_payload_dto_1 = require("../dto/upi-account-payload.dto");
const payout_response_dto_1 = require("../dto/payout-response.dto");
let PayoutController = class PayoutController {
    constructor(payoutService) {
        this.payoutService = payoutService;
    }
    async handleTransactions(req, payload) {
        return this.payoutService.payoutAccount(req.user.sub, payload);
    }
    async handleUpiPayout(req, payload) {
        return this.payoutService.payoutUPI(req.user.sub, payload);
    }
    async verifyAccount(verifyAccountRequestDTO) {
        return this.payoutService.verifyAccount(verifyAccountRequestDTO);
    }
    async verifyUpi(verifyAccountRequestDTO) {
        return this.payoutService.verifyUpi(verifyAccountRequestDTO);
    }
};
exports.PayoutController = PayoutController;
__decorate([
    (0, common_1.Post)('payout'),
    (0, swagger_1.ApiOperation)({ summary: 'payout to given account number' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The UPI payment result',
        type: payout_response_dto_1.PayoutResponseDTO,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payout_payload_dto_1.AccountPayoutPayload]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "handleTransactions", null);
__decorate([
    (0, common_1.Post)('payout/upi'),
    (0, swagger_1.ApiOperation)({ summary: 'payout to given upi id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The UPI payment result',
        type: payout_response_dto_1.PayoutResponseDTO,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, upi_account_payload_dto_1.UPIPayoutPayload]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "handleUpiPayout", null);
__decorate([
    (0, common_1.Post)('verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify a bank account' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The account verification result',
        type: verify_account_response_dto_1.VerifyAccountResponseDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_account_request_dto_1.VerifyAccountRequestDTO]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "verifyAccount", null);
__decorate([
    (0, common_1.Post)('verify/upi'),
    (0, swagger_1.ApiOperation)({ summary: 'Verify upi id' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'The account verification result',
        type: verify_account_response_dto_1.VerifyAccountResponseDTO,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_upi_request_dto_1.VerifyUpiRequestDTO]),
    __metadata("design:returntype", Promise)
], PayoutController.prototype, "verifyUpi", null);
exports.PayoutController = PayoutController = __decorate([
    (0, common_1.Controller)('account'),
    (0, swagger_1.ApiTags)('Account'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payout_service_1.PayoutService])
], PayoutController);
//# sourceMappingURL=payout.controller.js.map
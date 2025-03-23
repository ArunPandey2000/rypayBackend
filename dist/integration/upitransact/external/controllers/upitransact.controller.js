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
exports.PaymentGatewayController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const payment_external_service_1 = require("../services/payment-external.service");
const payment_request_dto_1 = require("../dto/payment-request.dto");
const jwt_auth_guard_1 = require("../../../../auth/guards/jwt-auth.guard");
let PaymentGatewayController = class PaymentGatewayController {
    constructor(externalService) {
        this.externalService = externalService;
    }
    async handleKycEvents(req, payload) {
        return this.externalService.createPaymentRequestOrder(req.user.sub, payload);
    }
};
exports.PaymentGatewayController = PaymentGatewayController;
__decorate([
    (0, common_1.Post)('payment/request'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payment_request_dto_1.PaymentRequestDto]),
    __metadata("design:returntype", Promise)
], PaymentGatewayController.prototype, "handleKycEvents", null);
exports.PaymentGatewayController = PaymentGatewayController = __decorate([
    (0, common_1.Controller)('external'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('External'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [payment_external_service_1.PaymentExternalService])
], PaymentGatewayController);
//# sourceMappingURL=upitransact.controller.js.map
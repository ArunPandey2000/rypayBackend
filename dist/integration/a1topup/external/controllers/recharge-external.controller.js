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
exports.RechargeExternalController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nestjs_pino_1 = require("nestjs-pino");
const wallet_service_1 = require("../../../../wallet/services/wallet.service");
const recharge_callback_dto_1 = require("../dto/recharge-callback.dto");
const typeorm_1 = require("@nestjs/typeorm");
const webhook_entity_1 = require("../../../../core/entities/webhook.entity");
const typeorm_2 = require("typeorm");
let RechargeExternalController = class RechargeExternalController {
    constructor(logger, webhookRepo, walletService) {
        this.logger = logger;
        this.webhookRepo = webhookRepo;
        this.walletService = walletService;
    }
    async handleTransactions(body) {
        try {
            const webHookData = this.getWebHookData(body);
            const webHookEntity = this.webhookRepo.create(webHookData);
            await this.webhookRepo.save(webHookEntity);
            if (body.status === 'FAILED') {
                this.walletService.processRechargeRefundPayment(body.urid);
            }
            else if (body.status === 'SUCCESS') {
                this.walletService.processRechargeSuccess(body.urid, body.transId, body.orderId);
            }
            else if (body.status === 'DISPUTED' || body.status === 'PENDING') {
                console.log('what to do here??');
            }
            else {
                throw new common_1.BadRequestException('invalid status');
            }
        }
        catch (err) {
            this.logger.error('recharge callback error', err);
            throw err;
        }
    }
    getWebHookData(body) {
        return {
            rypayOrderId: body.urid,
            webHookOrderId: body.orderId,
            status: body.status,
            transId: body.transId,
            additionalData: body
        };
    }
};
exports.RechargeExternalController = RechargeExternalController;
__decorate([
    (0, common_1.Post)('recharge/callback'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [recharge_callback_dto_1.RechargeTransactionPayloadDto]),
    __metadata("design:returntype", Promise)
], RechargeExternalController.prototype, "handleTransactions", null);
exports.RechargeExternalController = RechargeExternalController = __decorate([
    (0, common_1.Controller)('external'),
    (0, swagger_1.ApiTags)('External'),
    __param(0, (0, nestjs_pino_1.InjectPinoLogger)(RechargeExternalController.name)),
    __param(1, (0, typeorm_1.InjectRepository)(webhook_entity_1.WebhookResponse)),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger,
        typeorm_2.Repository,
        wallet_service_1.WalletService])
], RechargeExternalController);
//# sourceMappingURL=recharge-external.controller.js.map
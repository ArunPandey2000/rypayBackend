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
exports.WalletProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const wallet_service_1 = require("../services/wallet.service");
let WalletProcessor = class WalletProcessor {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async handleRechargeNotification(job) {
        const data = job.data;
        this.walletService.handleReferrelBonus(data.referrer, data.refree);
    }
};
exports.WalletProcessor = WalletProcessor;
__decorate([
    (0, bull_1.Process)('referrel'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletProcessor.prototype, "handleRechargeNotification", null);
exports.WalletProcessor = WalletProcessor = __decorate([
    (0, bull_1.Processor)('wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletProcessor);
//# sourceMappingURL=wallet.processor.js.map
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
exports.WalletBridge = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
let WalletBridge = class WalletBridge {
    constructor(walletQueue) {
        this.walletQueue = walletQueue;
    }
    async add(processName, opt) {
        return this.walletQueue.add(processName, opt);
    }
};
exports.WalletBridge = WalletBridge;
exports.WalletBridge = WalletBridge = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)(),
    __param(0, (0, bull_1.InjectQueue)('wallet')),
    __metadata("design:paramtypes", [Object])
], WalletBridge);
//# sourceMappingURL=wallet.queue.js.map
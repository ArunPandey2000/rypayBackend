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
var CoinCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const coins_entity_1 = require("../core/entities/coins.entity");
const notification_bridge_1 = require("../notifications/services/notification-bridge");
let CoinCronService = CoinCronService_1 = class CoinCronService {
    constructor(coinTransactionRepository, notificationBridge) {
        this.coinTransactionRepository = coinTransactionRepository;
        this.notificationBridge = notificationBridge;
        this.logger = new common_1.Logger(CoinCronService_1.name);
    }
    async expireOldCoins() {
        const currentDate = new Date();
        const expirationDate = new Date();
        expirationDate.setFullYear(currentDate.getFullYear() - 1);
        this.logger.log('Running coin expiration cron job...');
        const coinsToExpire = await this.coinTransactionRepository.find({
            where: {
                created_at: (0, typeorm_1.LessThan)(expirationDate),
                coinAmount: (0, typeorm_1.MoreThan)(0),
                isExpired: false,
            },
            relations: ['user']
        });
        if (coinsToExpire.length === 0) {
            this.logger.log('No coins to expire.');
            return;
        }
        for (const coin of coinsToExpire) {
            coin.isExpired = true;
            this.notificationBridge.add('coinExpiry', coin);
        }
        await this.coinTransactionRepository.save(coinsToExpire);
        this.logger.log(`Expired ${coinsToExpire.length} coin transactions.`);
    }
};
exports.CoinCronService = CoinCronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoinCronService.prototype, "expireOldCoins", null);
exports.CoinCronService = CoinCronService = CoinCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(coins_entity_1.CoinTransaction)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        notification_bridge_1.NotificationBridge])
], CoinCronService);
//# sourceMappingURL=coin-cron.service.js.map
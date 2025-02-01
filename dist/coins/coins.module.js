"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinsModule = void 0;
const bull_1 = require("@nestjs/bull");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coins_entity_1 = require("../core/entities/coins.entity");
const redemption_rules_entity_1 = require("../core/entities/redemption-rules.entity");
const user_entity_1 = require("../core/entities/user.entity");
const wallet_entity_1 = require("../core/entities/wallet.entity");
const wallet_queue_1 = require("../wallet/services/wallet.queue");
const coins_controller_1 = require("./coins.controller");
const coins_service_1 = require("./coins.service");
const coin_cron_service_1 = require("./coin-cron.service");
const notification_bridge_1 = require("../notifications/services/notification-bridge");
let CoinsModule = class CoinsModule {
};
exports.CoinsModule = CoinsModule;
exports.CoinsModule = CoinsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bull_1.BullModule.registerQueue({ name: 'wallet' }),
            bull_1.BullModule.registerQueue({ name: 'notification' }),
            typeorm_1.TypeOrmModule.forFeature([coins_entity_1.CoinTransaction, redemption_rules_entity_1.RedemptionRule, user_entity_1.User, wallet_entity_1.Wallet])
        ],
        providers: [coins_service_1.CoinTransactionService, coin_cron_service_1.CoinCronService, wallet_queue_1.WalletBridge, notification_bridge_1.NotificationBridge],
        controllers: [coins_controller_1.CoinsController],
        exports: [coins_service_1.CoinTransactionService]
    })
], CoinsModule);
//# sourceMappingURL=coins.module.js.map
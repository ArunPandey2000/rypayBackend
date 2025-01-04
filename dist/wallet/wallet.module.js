"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const wallet_entity_1 = require("../core/entities/wallet.entity");
const wallet_controller_1 = require("./controllers/wallet.controller");
const wallet_service_1 = require("./services/wallet.service");
const users_module_1 = require("../users/users.module");
const transactions_entity_1 = require("../core/entities/transactions.entity");
const transactions_module_1 = require("../transactions/transactions.module");
const order_entity_1 = require("../core/entities/order.entity");
const notifications_module_1 = require("../notifications/notifications.module");
let WalletModule = class WalletModule {
};
exports.WalletModule = WalletModule;
exports.WalletModule = WalletModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([wallet_entity_1.Wallet, user_entity_1.User, transactions_entity_1.Transaction, order_entity_1.Order]),
            (0, common_1.forwardRef)(() => users_module_1.UsersModule),
            transactions_module_1.TransactionsModule,
            notifications_module_1.NotificationsModule
        ],
        providers: [wallet_service_1.WalletService],
        controllers: [wallet_controller_1.WalletController],
        exports: [wallet_service_1.WalletService]
    })
], WalletModule);
//# sourceMappingURL=wallet.module.js.map
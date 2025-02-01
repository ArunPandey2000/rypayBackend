"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RechargeModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../core/entities/order.entity");
const user_entity_1 = require("../core/entities/user.entity");
const integration_module_1 = require("../integration/integration.module");
const wallet_module_1 = require("../wallet/wallet.module");
const recharge_controller_1 = require("./controllers/recharge.controller");
const recharge_service_1 = require("./services/recharge.service");
let RechargeModule = class RechargeModule {
};
exports.RechargeModule = RechargeModule;
exports.RechargeModule = RechargeModule = __decorate([
    (0, common_1.Module)({
        imports: [wallet_module_1.WalletModule, integration_module_1.IntegrationModule, typeorm_1.TypeOrmModule.forFeature([order_entity_1.Order, user_entity_1.User])],
        providers: [recharge_service_1.RechargeService],
        controllers: [recharge_controller_1.RechargeController]
    })
], RechargeModule);
//# sourceMappingURL=recharge.module.js.map
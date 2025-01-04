"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoansModule = void 0;
const common_1 = require("@nestjs/common");
const loans_service_1 = require("./loans.service");
const loans_controller_1 = require("./loans.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const loan_entity_1 = require("../core/entities/loan.entity");
const order_entity_1 = require("../core/entities/order.entity");
const wallet_service_1 = require("../wallet/services/wallet.service");
const wallet_entity_1 = require("../core/entities/wallet.entity");
const transactions_service_1 = require("../transactions/services/transactions.service");
const transactions_entity_1 = require("../core/entities/transactions.entity");
const pdf_service_1 = require("../pdf/services/pdf.service");
const notifications_module_1 = require("../notifications/notifications.module");
let LoansModule = class LoansModule {
};
exports.LoansModule = LoansModule;
exports.LoansModule = LoansModule = __decorate([
    (0, common_1.Module)({
        imports: [
            notifications_module_1.NotificationsModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, loan_entity_1.Loan, order_entity_1.Order, wallet_entity_1.Wallet, transactions_entity_1.Transaction])
        ],
        controllers: [loans_controller_1.LoansController],
        providers: [loans_service_1.LoansService, wallet_service_1.WalletService, transactions_service_1.TransactionsService, pdf_service_1.PdfService],
    })
], LoansModule);
//# sourceMappingURL=loans.module.js.map
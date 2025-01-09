"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionsModule = void 0;
const common_1 = require("@nestjs/common");
const transactions_service_1 = require("./services/transactions.service");
const transactions_controller_1 = require("./controllers/transactions.controller");
const typeorm_1 = require("@nestjs/typeorm");
const transactions_entity_1 = require("../core/entities/transactions.entity");
const pdf_module_1 = require("../pdf/pdf.module");
const bull_1 = require("@nestjs/bull");
const transaction_report_processor_1 = require("./procesor/transaction-report.processor");
const user_entity_1 = require("../core/entities/user.entity");
const order_entity_1 = require("../core/entities/order.entity");
let TransactionsModule = class TransactionsModule {
};
exports.TransactionsModule = TransactionsModule;
exports.TransactionsModule = TransactionsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([transactions_entity_1.Transaction, user_entity_1.User, order_entity_1.Order]),
            bull_1.BullModule.registerQueue({
                name: 'transaction-report',
            }),
            pdf_module_1.PdfModule],
        providers: [transactions_service_1.TransactionsService, transaction_report_processor_1.TransactionProcessor],
        controllers: [transactions_controller_1.TransactionsController],
        exports: [transactions_service_1.TransactionsService]
    })
], TransactionsModule);
//# sourceMappingURL=transactions.module.js.map
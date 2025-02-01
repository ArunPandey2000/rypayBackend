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
exports.TransactionProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const transactions_service_1 = require("../services/transactions.service");
let TransactionProcessor = class TransactionProcessor {
    constructor(transactionService) {
        this.transactionService = transactionService;
    }
    async handleGenerate(job) {
        const data = job.data;
        const pdfBuffer = await this.transactionService.getPrintableTransactionRecords(data, data.payload);
        return pdfBuffer;
    }
};
exports.TransactionProcessor = TransactionProcessor;
__decorate([
    (0, bull_1.Process)('generate'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TransactionProcessor.prototype, "handleGenerate", null);
exports.TransactionProcessor = TransactionProcessor = __decorate([
    (0, bull_1.Processor)('transaction-report'),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService])
], TransactionProcessor);
//# sourceMappingURL=transaction-report.processor.js.map
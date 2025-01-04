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
exports.TransactionsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_transactions_dto_1 = require("../dto/get-transactions.dto");
const transactions_service_1 = require("../services/transactions.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const bull_1 = require("@nestjs/bull");
const pagination_response_dto_1 = require("../dto/pagination-response.dto");
const admin_guard_1 = require("../../auth/guards/admin.guard");
const transaction_detail_dto_1 = require("../dto/transaction-detail.dto");
let TransactionsController = class TransactionsController {
    constructor(transactionService, reportQueue) {
        this.transactionService = transactionService;
        this.reportQueue = reportQueue;
    }
    async GetWalletTransactions(req, transcationQuery) {
        const result = await this.transactionService.getWalletTransactions(req, transcationQuery);
        return result;
    }
    async GetTransactionDetail(transactionId) {
        const result = await this.transactionService.getTransactionDetail(transactionId);
        return result;
    }
    async GetAllWalletTransactions(transcationQuery) {
        const result = await this.transactionService.getAllWalletTransactions(transcationQuery);
        return result;
    }
    async generatePDF(req, data, res) {
        const queuePayload = {
            payload: data,
            user: req.user
        };
        const job = await this.reportQueue.add('generate', queuePayload);
        const jobData = (await job.finished()).data;
        const pdfBuffer = Buffer.from(jobData);
        const date = new Date();
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `attachment; filename=${req.user.phone}-${date.getTime()}.pdf`,
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
    }
};
exports.TransactionsController = TransactionsController;
__decorate([
    (0, common_1.Post)('/'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of transactions with pagination',
        type: pagination_response_dto_1.PaginatedResponseDto,
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_transactions_dto_1.TransactionQueryDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "GetWalletTransactions", null);
__decorate([
    (0, common_1.Post)('/:transactionId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'detail of transaction',
        type: transaction_detail_dto_1.TransactionDetailDto,
    }),
    __param(0, (0, common_1.Param)('transactionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "GetTransactionDetail", null);
__decorate([
    (0, common_1.Post)('/all'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'List of transactions with pagination',
        type: pagination_response_dto_1.PaginatedResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [get_transactions_dto_1.TransactionQueryDto]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "GetAllWalletTransactions", null);
__decorate([
    (0, common_1.Post)('generate'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, get_transactions_dto_1.PrintableTransactionQueryDto, Object]),
    __metadata("design:returntype", Promise)
], TransactionsController.prototype, "generatePDF", null);
exports.TransactionsController = TransactionsController = __decorate([
    (0, common_1.Controller)('transactions'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Transactions'),
    (0, common_1.Controller)('transactions'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(1, (0, bull_1.InjectQueue)('transaction-report')),
    __metadata("design:paramtypes", [transactions_service_1.TransactionsService, Object])
], TransactionsController);
//# sourceMappingURL=transactions.controller.js.map
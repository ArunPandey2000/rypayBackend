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
exports.TransactionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const transactions_entity_1 = require("../../core/entities/transactions.entity");
const typeorm_2 = require("typeorm");
const pagination_response_dto_1 = require("../dto/pagination-response.dto");
const pdf_service_1 = require("../../pdf/services/pdf.service");
const date_util_1 = require("../../core/utils/date.util");
const user_entity_1 = require("../../core/entities/user.entity");
const transaction_detail_dto_1 = require("../dto/transaction-detail.dto");
const order_entity_1 = require("../../core/entities/order.entity");
let TransactionsService = class TransactionsService {
    constructor(transactionsRepository, orderRepo, userRepo, pdfService) {
        this.transactionsRepository = transactionsRepository;
        this.orderRepo = orderRepo;
        this.userRepo = userRepo;
        this.pdfService = pdfService;
    }
    async saveTransaction(createTransactionDto, queryRunner) {
        const transactions = this.transactionsRepository.create(createTransactionDto);
        if (!transactions) {
            await queryRunner.rollbackTransaction();
            await queryRunner.release();
            throw new common_1.BadRequestException('Transaction cannot be created');
        }
        await queryRunner.manager.save(transactions);
        return transactions;
    }
    async getWalletTransactions(req, queryDto) {
        const userId = req.user.sub;
        const { page = 1, pageSize = 10 } = queryDto.pagination || {};
        const skipRecords = pageSize * (page - 1);
        const { search, transactionType, fromDate, toDate, sortDirection } = queryDto;
        const baseWhere = {
            user: { id: userId },
            ...(transactionType && { type: transactionType }),
            ...(fromDate && toDate && { transactionDate: (0, typeorm_2.Between)(new Date(fromDate), new Date(toDate)) }),
        };
        let where = baseWhere;
        if (search) {
            where = [
                {
                    ...baseWhere,
                    transactionHash: (0, typeorm_2.Like)(`%${search}%`),
                },
                {
                    ...baseWhere,
                    description: (0, typeorm_2.Like)(`%${search}%`),
                },
                {
                    ...baseWhere,
                    reference: (0, typeorm_2.Like)(`%${search}%`),
                },
            ];
        }
        const transactions = await this.transactionsRepository.find({
            where: where,
            order: { createdAt: sortDirection },
            take: pageSize,
            skip: skipRecords,
        });
        const total = await this.transactionsRepository.count({ where: where });
        const walletTransactionUserIds = Array.from(new Set(transactions.map((transaction) => this.getRelevantUserId(transaction))));
        const userData = await this.userRepo.find({
            where: { id: (0, typeorm_2.In)(walletTransactionUserIds) },
        });
        const result = transactions.map((transaction) => {
            const counterPartyUser = this.getCounterpartyUser(transaction, userData);
            return {
                id: transaction.id,
                amount: transaction.amount,
                walletBalanceBefore: transaction.walletBalanceBefore,
                walletBalanceAfter: transaction.walletBalanceAfter,
                sender: transaction.sender,
                receiver: transaction.receiver,
                reference: transaction.reference,
                description: transaction.description,
                transactionHash: transaction.transactionHash,
                transactionType: transaction.type,
                transactionDate: transaction.transactionDate,
                createdAt: transaction.createdAt,
                serviceUsed: transaction.serviceUsed,
                updatedAt: transaction.updatedAt,
                counterPartyUser,
            };
        });
        return new pagination_response_dto_1.Pagination().PaginateResponse(result, total, page, pageSize);
    }
    async getTransactionDetail(transactionId) {
        if (!transactionId || Number.isNaN(Number.parseInt(transactionId))) {
            throw new common_1.BadRequestException('TransactionId is mandatory');
        }
        const transaction = await this.transactionsRepository.findOneBy({
            id: Number.parseInt(transactionId)
        });
        if (!transaction) {
            throw new common_1.NotFoundException('transaction not found');
        }
        const senderUser = transaction.sender ? await this.userRepo.findOneBy({
            id: transaction.sender
        }) : null;
        const receiverUser = transaction.receiver && transaction.serviceUsed === "WALLET" ? await this.userRepo.findOneBy({
            id: transaction.receiver
        }) : null;
        const order = await this.orderRepo.findOne({ where: { order_id: transaction.reference } });
        const accountDetails = order ? {
            accountNumber: order.accountId,
            ifscNumber: order.ifscNumber,
            userName: order.respectiveUserName,
            paymentMode: order.paymentMode
        } : null;
        return new transaction_detail_dto_1.TransactionDetailDto(transaction, senderUser, receiverUser, accountDetails);
    }
    async getAllWalletTransactions(queryDto) {
        const { page = 1, pageSize = 10 } = queryDto.pagination || {};
        const skipRecords = pageSize * (page - 1);
        const { search, transactionType, fromDate, toDate, sortDirection } = queryDto;
        const baseWhere = {
            ...(transactionType && { type: transactionType }),
            ...(fromDate && toDate && { transactionDate: (0, typeorm_2.Between)(new Date(fromDate), new Date(toDate)) }),
        };
        let where = baseWhere;
        if (search) {
            where = [
                {
                    ...baseWhere,
                    transactionHash: (0, typeorm_2.Like)(`%${search}%`),
                },
                {
                    ...baseWhere,
                    description: (0, typeorm_2.Like)(`%${search}%`),
                },
                {
                    ...baseWhere,
                    reference: (0, typeorm_2.Like)(`%${search}%`),
                },
            ];
        }
        const transactions = await this.transactionsRepository.find({
            where: where,
            order: { createdAt: sortDirection || 'DESC' },
            take: pageSize,
            skip: skipRecords,
        });
        const total = await this.transactionsRepository.count({ where: where });
        const walletTransactionUserIds = Array.from(new Set(transactions.map((transaction) => this.getRelevantUserId(transaction))));
        const userData = await this.userRepo.find({
            where: { id: (0, typeorm_2.In)(walletTransactionUserIds) },
        });
        const result = transactions.map((transaction) => {
            const counterPartyUser = this.getCounterpartyUser(transaction, userData);
            return {
                id: transaction.id,
                amount: transaction.amount,
                walletBalanceBefore: transaction.walletBalanceBefore,
                walletBalanceAfter: transaction.walletBalanceAfter,
                sender: transaction.sender,
                receiver: transaction.receiver,
                reference: transaction.reference,
                description: transaction.description,
                transactionHash: transaction.transactionHash,
                transactionType: transaction.type,
                transactionDate: transaction.transactionDate,
                createdAt: transaction.createdAt,
                serviceUsed: transaction.serviceUsed,
                updatedAt: transaction.updatedAt,
                counterPartyUser,
            };
        });
        return new pagination_response_dto_1.Pagination().PaginateResponse(result, total, page, pageSize);
    }
    getRelevantUserId(transaction) {
        if (transaction.serviceUsed === "WALLET") {
            if (transaction.type === "CREDIT") {
                return transaction.sender || transaction.receiver;
            }
            else {
                return transaction.receiver || transaction.sender;
            }
        }
        return null;
    }
    getCounterpartyUser(transaction, userData) {
        const userId = this.getRelevantUserId(transaction);
        if (!userId) {
            return null;
        }
        const user = userData.find((user) => user.id.toString() === userId);
        return user ? {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
        } : null;
    }
    async getPrintableTransactionRecords(req, queryDto) {
        if (!queryDto.pagination) {
            queryDto.pagination = {
                page: 1,
                pageSize: Number.MAX_SAFE_INTEGER
            };
        }
        const result = await this.getWalletTransactions(req, queryDto);
        const transaction = await this.transactionsRepository.findOne({
            where: {
                user: {
                    id: req.user.sub
                },
            },
            relations: ['user', 'user.address']
        });
        const user = transaction?.user;
        const pdfPayload = {
            dateRange: {
                to: (0, date_util_1.formatDateToIST)(new Date(queryDto.toDate), false),
                from: (0, date_util_1.formatDateToIST)(new Date(queryDto.fromDate), false)
            },
            generatedDate: (0, date_util_1.formatDateToIST)(new Date()),
            user: {
                name: `${user.firstName} ${user.lastName}`,
                cardNumber: '*********1234',
                panNumber: user.panNumber,
                accountNumber: '4658511009',
                ifscCode: 'YESB0000136',
                address: `${user.address.address1} ${user.address.address2} ${user.address.city} ${user.address.state} ${user.address.pincode}`
            },
            statement: result.data.map((record) => ({
                date: (0, date_util_1.formatDateToIST)(record.transactionDate),
                description: record.description,
                reference: record.reference,
                amount: (0, date_util_1.formatAmountToINR)(record.amount),
                transactionType: record.transactionType,
                transactionHash: record.transactionHash,
                balance: (0, date_util_1.formatAmountToINR)(record.walletBalanceAfter)
            }))
        };
        return this.pdfService.generatePDF(pdfPayload);
    }
};
exports.TransactionsService = TransactionsService;
exports.TransactionsService = TransactionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(transactions_entity_1.Transaction)),
    __param(1, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        pdf_service_1.PdfService])
], TransactionsService);
//# sourceMappingURL=transactions.service.js.map
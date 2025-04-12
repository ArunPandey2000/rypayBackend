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
exports.LoansService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const loan_entity_1 = require("../core/entities/loan.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const loan_dto_1 = require("./dto/loan.dto");
const wallet_service_1 = require("../wallet/services/wallet.service");
const order_entity_1 = require("../core/entities/order.entity");
const hash_util_1 = require("../core/utils/hash.util");
const transactions_entity_1 = require("../core/entities/transactions.entity");
const loan_status_enum_1 = require("./enums/loan-status.enum");
const moment = require("moment");
let LoansService = class LoansService {
    constructor(loanRepo, walletService, orderRepository, userRepo) {
        this.loanRepo = loanRepo;
        this.walletService = walletService;
        this.orderRepository = orderRepository;
        this.userRepo = userRepo;
    }
    async createLoan(createLoanDto) {
        let loanResponse = [];
        try {
            const user = await this.userRepo.findOneBy({ id: createLoanDto.userId });
            if (!user) {
                throw new common_1.NotFoundException(`User with ID ${createLoanDto.userId} not found`);
            }
            const { totalAmount, overdueAmount, installmentDate, installmentAmount } = createLoanDto;
            const installmentsCount = Math.ceil(totalAmount / installmentAmount);
            const loans = [];
            let currentOverdueDate = new Date(installmentDate);
            for (let i = 0; i < installmentsCount; i++) {
                const isLastInstallment = i === installmentsCount - 1;
                const loanAmount = isLastInstallment ? totalAmount - (installmentAmount * (installmentsCount - 1)) : installmentAmount;
                const loan = this.loanRepo.create({
                    loanAccount: createLoanDto.loanId,
                    totalAmount: totalAmount,
                    overdueAmount: overdueAmount,
                    installmentAmount: loanAmount,
                    loanStatus: 'Pending',
                    user,
                    dueDate: currentOverdueDate,
                });
                currentOverdueDate = this.addMonths(currentOverdueDate, 1);
                loans.push(loan);
            }
            loanResponse = await this.loanRepo.save(loans);
        }
        catch (err) {
            throw err;
        }
        return loanResponse.map(loan => new loan_dto_1.LoanAdminResponseDto(loan));
    }
    addMonths(date, months) {
        const originalDay = date.getDate();
        const newDate = new Date(date);
        const isfeb = (date.getMonth() + 1 + months) % 12 === 2;
        newDate.setMonth(newDate.getMonth() + months);
        if (isfeb && originalDay > 28) {
            const isLeapYear = (newDate.getFullYear() % 4 === 0 && (newDate.getFullYear() % 100 !== 0 || newDate.getFullYear() % 400 === 0));
            newDate.setDate(isLeapYear ? 29 : 28);
            newDate.setMonth(1);
        }
        else {
            const lastDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
            newDate.setDate(Math.min(originalDay, lastDayOfMonth));
        }
        return newDate;
    }
    async findAllUserLoans(userId) {
        if (!userId) {
            throw new common_1.BadRequestException('userId not found');
        }
        const endOfCurrentMonth = moment().endOf('month').toDate();
        const loans = (await this.loanRepo.find({
            where: {
                user: {
                    id: userId
                },
                dueDate: (0, typeorm_2.LessThanOrEqual)(endOfCurrentMonth),
            },
            order: {
                dueDate: 'ASC'
            }
        })) ?? [];
        return loans.map(loan => new loan_dto_1.LoanResponseDto(loan));
    }
    async findAllLoans() {
        const loans = await this.loanRepo.find({});
        return loans.map(loan => new loan_dto_1.LoanAdminResponseDto(loan));
    }
    async findOne(id) {
        const loan = await this.loanRepo.findOneBy({ id });
        if (!loan) {
            throw new common_1.NotFoundException(`Loan with ID ${id} not found`);
        }
        return new loan_dto_1.LoanResponseDto(loan);
    }
    async updateLoan(id, paymentDto) {
        const loan = await this.loanRepo.findOneBy({ id });
        if (!loan) {
            throw new common_1.NotFoundException(`Loan with ID ${id} not found`);
        }
        if (paymentDto.loanStatus) {
            loan.loanStatus = paymentDto.loanStatus;
        }
        if (paymentDto.installmentAmount !== undefined) {
            loan.installmentAmount = paymentDto.installmentAmount;
        }
        if (paymentDto.overdueAmount !== undefined) {
            loan.overdueAmount = paymentDto.overdueAmount;
        }
        return this.loanRepo.save(loan);
    }
    async remove(id) {
        const loan = await this.loanRepo.findBy({ id: id });
        if (!loan) {
            throw new common_1.BadRequestException('loan Id not found');
        }
        await this.loanRepo.remove(loan);
    }
    async payLoan(userId, loanPaymentDto) {
        if (!loanPaymentDto.loanId) {
            throw new common_1.BadRequestException('loanId is mandatory');
        }
        const loan = await this.loanRepo.findOneBy({
            id: +loanPaymentDto.loanId
        });
        if (!loan) {
            throw new common_1.NotFoundException('Loan not found against this loan Id');
        }
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user || loan.user.id !== userId) {
            throw new common_1.ForbiddenException('User not found');
        }
        const wallet = await this.walletService.getWallet({ user: { id: userId } });
        if (wallet.balance < loanPaymentDto.amount) {
            throw new common_1.BadRequestException('Insufficient Balance');
        }
        const description = loanPaymentDto.remarks ? loanPaymentDto.remarks : `Loan Payment ${loan.loanAccount}`;
        const orderId = (0, hash_util_1.generateRef)(12);
        const order = {
            order_id: orderId,
            order_type: order_entity_1.OrderType.PAYMENT,
            gateway_response: '',
            amount: loanPaymentDto.amount,
            status: order_entity_1.OrderStatus.SUCCESS,
            transaction_id: loan.loanAccount,
            user: user,
            description: description,
            payment_method: 'WALLET',
            respectiveUserName: "",
            ifscNumber: null,
            accountId: loan.loanAccount
        };
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);
        await this.walletService.processRechargePayment({ amount: loanPaymentDto.amount,
            receiverId: loan.loanAccount,
            serviceUsed: 'LoanPayment',
            description: description,
            status: transactions_entity_1.TransactionStatus.SUCCESS,
            reference: orderId }, userId);
        await this.handleLoanPayment(loan, loanPaymentDto);
        return {
            referenceId: SavedOrder.order_id,
            amount: loanPaymentDto.amount,
            message: description
        };
    }
    async handleLoanPayment(loan, loanPaymentDto) {
        const installmentAmount = +loan.installmentAmount, overdueAmount = +loan.overdueAmount;
        const totalAmount = installmentAmount + overdueAmount;
        const newStatus = loanPaymentDto.amount >= totalAmount ? loan_status_enum_1.LoanStatus.Paid : loan_status_enum_1.LoanStatus.PartiallyPending;
        const isExtraAmountThenInstallment = loanPaymentDto.amount > installmentAmount;
        let newInstallmentAmount = installmentAmount - loanPaymentDto.amount;
        let newOverdueAmount = overdueAmount;
        if (loanPaymentDto.amount > totalAmount) {
            throw new common_1.BadRequestException('Loan Payment amount is greater than loan amount');
        }
        if (loan.loanStatus === loan_status_enum_1.LoanStatus.Paid) {
            throw new common_1.BadRequestException('Loan Payment already done');
        }
        if (isExtraAmountThenInstallment) {
            loan.installmentAmount = 0;
            const extraAmount = loanPaymentDto.amount - installmentAmount;
            newOverdueAmount = overdueAmount - extraAmount;
        }
        await this.loanRepo.update({ id: +loanPaymentDto.loanId }, {
            loanStatus: newStatus,
            installmentAmount: newInstallmentAmount,
            overdueAmount: newOverdueAmount
        });
    }
};
exports.LoansService = LoansService;
exports.LoansService = LoansService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(loan_entity_1.Loan)),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        wallet_service_1.WalletService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LoansService);
//# sourceMappingURL=loans.service.js.map
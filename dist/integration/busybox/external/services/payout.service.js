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
var PayoutService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayoutService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../../../../core/entities/order.entity");
const transactions_entity_1 = require("../../../../core/entities/transactions.entity");
const user_entity_1 = require("../../../../core/entities/user.entity");
const hash_util_1 = require("../../../../core/utils/hash.util");
const wallet_service_1 = require("../../../../wallet/services/wallet.service");
const typeorm_2 = require("typeorm");
const payout_client_service_1 = require("../../external-system-client/payout-client.service");
const external_constant_1 = require("../constants/external.constant");
let PayoutService = PayoutService_1 = class PayoutService {
    constructor(walletService, payloutClientService, orderRepository, userRepository) {
        this.walletService = walletService;
        this.payloutClientService = payloutClientService;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.logger = new common_1.Logger(PayoutService_1.name);
    }
    async payoutAccount(userId, requestDto) {
        await this.validatePayout(userId, requestDto.amount);
        const requestBody = {
            account_number: requestDto.accountNumber,
            amount: requestDto.amount,
            ifsc_code: requestDto.ifsc,
            mobile: requestDto.mobile,
            mode: requestDto.mode
        };
        const response = (await this.payloutClientService.payoutUsingAccount(requestBody));
        if (response.status === 'FAILURE') {
            throw new common_1.BadRequestException(response.message);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const maskedAccount = (0, hash_util_1.maskAccount)(requestBody.account_number);
        const description = requestDto.message ? requestDto.message : external_constant_1.PayoutDescription.replace('{maskedAccount}', maskedAccount);
        const orderId = (0, hash_util_1.generateRef)(6);
        const order = {
            order_id: orderId,
            order_type: order_entity_1.OrderType.PAYOUT,
            gateway_response: '',
            amount: requestDto.amount,
            status: order_entity_1.OrderStatus.PENDING,
            transaction_id: response.stan?.toString(),
            user: user,
            description: description,
            payment_method: 'WALLET',
            paymentMode: requestDto.mode,
            respectiveUserName: requestDto.userName ?? "",
            ifscNumber: requestDto.ifsc,
            accountId: requestDto.accountNumber
        };
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);
        await this.walletService.processRechargePayment({ amount: requestDto.amount,
            receiverId: requestDto.accountNumber,
            serviceUsed: 'Payout',
            description: description,
            status: transactions_entity_1.TransactionStatus.PENDING,
            reference: orderId }, userId);
        return {
            referenceId: SavedOrder.order_id,
            amount: +response.amount,
            message: description
        };
    }
    async validatePayout(userId, amount) {
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const poolBalance = +(await this.payloutClientService.getPoolBalance()).balance;
        if (poolBalance < amount) {
            throw new common_1.BadRequestException('System Error');
        }
        if (!user) {
            throw new common_1.ForbiddenException('User does not exist');
        }
        const wallet = await this.walletService.getWallet({ user: { id: userId } });
        if (wallet.balance < amount) {
            throw new common_1.BadRequestException('Insufficient Balance');
        }
    }
    async payoutUPI(userId, requestDto) {
        await this.validatePayout(userId, requestDto.amount);
        const requestBody = {
            account_number: requestDto.upiId,
            amount: requestDto.amount,
            mobile: requestDto.mobile,
            mode: "UPI"
        };
        const response = (await this.payloutClientService.payoutUsingUPI(requestBody));
        if (response.status === 'FAILURE') {
            throw new common_1.BadRequestException(response.message);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const maskedAccount = (0, hash_util_1.maskAccount)(requestBody.account_number);
        const description = requestDto.message ? requestDto.message : external_constant_1.PayoutDescription.replace('{maskedAccount}', maskedAccount);
        const orderId = (0, hash_util_1.generateRef)(6);
        const order = {
            order_id: orderId,
            order_type: order_entity_1.OrderType.UPI_PAYOUT,
            gateway_response: '',
            amount: requestDto.amount,
            status: order_entity_1.OrderStatus.PENDING,
            transaction_id: response.stan?.toString(),
            user: user,
            description: description,
            payment_method: 'WALLET',
            respectiveUserName: requestDto.upiUserName,
            ifscNumber: null,
            paymentMode: 'UPI',
            accountId: requestDto.upiId
        };
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);
        await this.walletService.processRechargePayment({ amount: requestDto.amount,
            receiverId: requestDto.upiId,
            serviceUsed: 'UPI',
            description: description,
            status: transactions_entity_1.TransactionStatus.PENDING,
            reference: orderId }, userId);
        return {
            referenceId: SavedOrder.order_id,
            amount: +response.amount,
            message: description
        };
    }
    async verifyAccount(verifyDto) {
        const payload = {
            account_number: verifyDto.accountNumber,
            ifsc_code: verifyDto.ifscCode
        };
        const data = await this.payloutClientService.verifyAccount(payload);
        if (data.resp_code === "S0200") {
            return {
                message: data.message,
                accountNumber: data.account_number,
                ifscCode: data.ifsc_code,
                nameInBank: data.NameInBank
            };
        }
        else if (data.resp_code === "E0404") {
            throw new common_1.NotFoundException(data.message);
        }
        throw new common_1.BadRequestException(data.message);
    }
    async verifyUpi(verifyDto) {
        const payload = {
            upi_vpa: verifyDto.upiId
        };
        const data = await this.payloutClientService.verifyUpi(payload);
        if (data.resp_code === "S0200") {
            return {
                message: data.message,
                accountNumber: data.account_number,
                ifscCode: data.ifsc_code,
                nameInBank: data.NameInBank
            };
        }
        else if (data.resp_code === "E0404") {
            throw new common_1.NotFoundException(data.message);
        }
        throw new common_1.BadRequestException(data.message);
    }
};
exports.PayoutService = PayoutService;
exports.PayoutService = PayoutService = PayoutService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        payout_client_service_1.PayoutClientService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], PayoutService);
//# sourceMappingURL=payout.service.js.map
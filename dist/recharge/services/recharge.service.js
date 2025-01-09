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
exports.RechargeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const order_entity_1 = require("../../core/entities/order.entity");
const transactions_entity_1 = require("../../core/entities/transactions.entity");
const user_entity_1 = require("../../core/entities/user.entity");
const hash_util_1 = require("../../core/utils/hash.util");
const recharge_client_service_1 = require("../../integration/a1topup/external-system-client/recharge/recharge-client.service");
const wallet_service_1 = require("../../wallet/services/wallet.service");
const typeorm_2 = require("typeorm");
const recharge_metadata_constant_1 = require("../constants/recharge-metadata.constant");
const recharge_plan_type_mapper_constant_1 = require("../constants/recharge-plan-type-mapper.constant");
const bill_response_dto_1 = require("../dto/bill-response.dto");
const circle_response_dto_1 = require("../dto/circle-response.dto");
const plan_dto_1 = require("../dto/plan.dto");
const provider_info_dto_1 = require("../dto/provider-info.dto");
let RechargeService = class RechargeService {
    constructor(walletService, rechargeClientService, orderRepository, userRepository) {
        this.walletService = walletService;
        this.rechargeClientService = rechargeClientService;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }
    getAvailableRechargeServices() {
        return recharge_metadata_constant_1.currentRechargeSupported;
    }
    async getServiceProvidersListByServiceId(serviceId) {
        const serviceProviders = await this.rechargeClientService.getServiceProvidersList();
        const gstProvider = recharge_plan_type_mapper_constant_1.gstMapper[serviceId] ?? 'P2P';
        const filteredProviders = serviceId ? serviceProviders.operatorList.filter((service) => service.serviceType === serviceId && service.gstMode === gstProvider) : serviceProviders.operatorList;
        return (filteredProviders || []).map(provider => new provider_info_dto_1.ProviderInfo(provider));
    }
    async getAllCircles() {
        const circleCodeResponse = await this.rechargeClientService.getCircleCodeList();
        return circleCodeResponse.stateList.map(circle => new circle_response_dto_1.CircleResponseDto(circle));
    }
    async rechargeAccount(userId, requestDto) {
        const wallet = await this.walletService.getWallet({ user: { id: userId } });
        if (wallet.balance < requestDto.amount) {
            throw new common_1.BadRequestException('Insufficient Balance');
        }
        const rechargePayload = this.getRechargePayload(requestDto);
        const response = (await this.rechargeClientService.initRecharge(rechargePayload)).data;
        if (response.status === 'FAILED') {
            throw new common_1.BadRequestException(response.resText);
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const description = requestDto.message ? requestDto.message : `${requestDto.accountNumber} ${requestDto.rechargeType}`;
        const order = {
            order_id: rechargePayload.urid,
            order_type: order_entity_1.OrderType.RECHARGE,
            gateway_response: '',
            amount: requestDto.amount,
            status: order_entity_1.OrderStatus.PENDING,
            transaction_id: response.transId,
            user: user,
            description: description,
            payment_method: 'WALLET',
            respectiveUserName: null,
            ifscNumber: null,
            accountId: requestDto.accountNumber
        };
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);
        await this.walletService.processRechargePayment({ amount: requestDto.amount,
            receiverId: requestDto.accountNumber,
            serviceUsed: requestDto.rechargeType,
            description: description,
            status: transactions_entity_1.TransactionStatus.PENDING,
            reference: rechargePayload.urid }, userId);
        return {
            referenceId: SavedOrder.order_id,
            amount: +response.amount,
            message: 'Recharge/Bill payment Successful'
        };
    }
    getRechargePayload(payload) {
        let basePayload = {
            amount: payload.amount,
            mobile: payload.accountNumber,
            urid: (0, hash_util_1.generateRef)(10)
        };
        if (payload.rechargeType === recharge_metadata_constant_1.RechargeServiceTypes.Electricity) {
            return {
                ...basePayload,
                bbpsId: payload.operatorCode,
                opValue1: payload.mobile
            };
        }
        return {
            ...basePayload,
            operatorId: payload.operatorCode,
        };
    }
    async getBillDetails(payload) {
        const reqPayload = {
            urid: payload.sessionId,
            customerMobile: payload.mobile,
            bbpsId: payload.operatorId,
            mobile: payload.accountNumber,
            opvalue1: payload.mobile,
            transType: 'billFetch'
        };
        const response = await this.rechargeClientService.fetchBill(reqPayload);
        if (response.status === "SUCCESS") {
            return new bill_response_dto_1.FetchBillResponse(response.billData);
        }
        throw new common_1.BadRequestException(response.resText);
    }
    async getPlans(operatorId, stateCode) {
        const plans = await this.rechargeClientService.getRechargePlansList(operatorId);
        const stateFilteredPlans = plans.planData.filter((plan) => plan.stateId === stateCode);
        return new plan_dto_1.PlanResponse(stateFilteredPlans, operatorId, stateCode);
    }
};
exports.RechargeService = RechargeService;
exports.RechargeService = RechargeService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(order_entity_1.Order)),
    __param(3, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [wallet_service_1.WalletService,
        recharge_client_service_1.RechargeClientService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], RechargeService);
//# sourceMappingURL=recharge.service.js.map
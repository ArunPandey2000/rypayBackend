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
exports.SubscriptionsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const plans_entity_1 = require("../core/entities/plans.entity");
const subscriptions_entity_1 = require("../core/entities/subscriptions.entity");
const transactions_entity_1 = require("../core/entities/transactions.entity");
const wallet_entity_1 = require("../core/entities/wallet.entity");
const typeorm_2 = require("typeorm");
const plan_response_dto_1 = require("./dto/plan-response.dto");
let SubscriptionsService = class SubscriptionsService {
    constructor(subscriptionRepository, planRepository, walletRepository, transactionRepository) {
        this.subscriptionRepository = subscriptionRepository;
        this.planRepository = planRepository;
        this.walletRepository = walletRepository;
        this.transactionRepository = transactionRepository;
    }
    async findAllWithLimits() {
        const plans = await this.planRepository.find({
            relations: ['limits'],
        });
        return plans.map((plan) => new plan_response_dto_1.PlanResponseDto(plan));
    }
    async findOneWithLimits(id) {
        const plan = await this.planRepository.findOne({
            where: { id },
            relations: ['limits'],
        });
        if (!plan) {
            throw new common_1.NotFoundException(`Plan with ID ${id} not found.`);
        }
        return new plan_response_dto_1.PlanResponseDto(plan);
    }
    async calculateUpgradeCost(userId, newPlanId) {
        const currentSubscription = await this.subscriptionRepository.findOne({
            where: { user_id: userId, is_current: true, status: 'Active' },
        });
        let currenPlanId = '6248880a-180b-4b96-a9fc-5a5f4ead4871';
        if (currentSubscription) {
            currenPlanId = currentSubscription.id;
        }
        const currentPlan = await this.planRepository.findOne({ where: {
                id: currenPlanId
            } });
        const newPlan = await this.planRepository.findOne({
            where: {
                id: newPlanId
            }
        });
        if (!newPlan)
            throw new Error('Invalid plan.');
        const wallet = await this.walletRepository.findOne({ where: { user: {
                    id: userId
                } } });
        if (!wallet)
            throw new Error('Wallet not found.');
        let refundAmount = 0;
        if (currentSubscription) {
            const today = new Date();
            const remainingDays = (new Date(currentSubscription.end_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
            refundAmount = (currentPlan.price / currentPlan.duration) * remainingDays;
        }
        const adjustedAmountToPay = Math.max(newPlan.price - refundAmount, 0);
        return {
            currentPlanId: currenPlanId,
            currentPlan: currentPlan.name,
            newPlan: newPlan.name,
            newPlanId: newPlanId,
            refundAmount: parseFloat(refundAmount.toFixed(2)),
            newPlanCost: newPlan.price,
            adjustedAmountToPay: parseFloat(adjustedAmountToPay.toFixed(2)),
            walletBalance: parseFloat(wallet.balance.toFixed(2)),
            amountToPayFromWallet: adjustedAmountToPay,
        };
    }
    async upgradePlan(userId, newPlanId) {
        const costDetails = await this.calculateUpgradeCost(userId, newPlanId);
        const { adjustedAmountToPay, amountToPayFromWallet } = costDetails;
        const wallet = await this.walletRepository.findOne({ where: { user: { id: userId } } });
        if (adjustedAmountToPay > wallet.balance) {
            throw new Error('Insufficient wallet balance. Please add funds to your wallet.');
        }
        wallet.balance -= amountToPayFromWallet;
        await this.walletRepository.save(wallet);
        const newPlan = await this.planRepository.findOne({ where: { id: newPlanId } });
        const today = new Date();
        const newEndDate = new Date(today.setDate(today.getDate() + newPlan.duration));
        await this.subscriptionRepository.update({ id: costDetails.currentPlanId }, { status: 'Expired', is_current: false });
        await this.subscriptionRepository.save({
            user_id: userId,
            plan_id: newPlanId,
            start_date: new Date(),
            end_date: newEndDate,
            status: 'Active',
            is_current: true,
        });
        return {
            message: 'Plan upgraded successfully.',
            newPlan: newPlan.name,
            amountDeducted: amountToPayFromWallet,
            remainingWalletBalance: wallet.balance,
        };
    }
};
exports.SubscriptionsService = SubscriptionsService;
exports.SubscriptionsService = SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subscriptions_entity_1.Subscription)),
    __param(1, (0, typeorm_1.InjectRepository)(plans_entity_1.Plan)),
    __param(2, (0, typeorm_1.InjectRepository)(wallet_entity_1.Wallet)),
    __param(3, (0, typeorm_1.InjectRepository)(transactions_entity_1.Transaction)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], SubscriptionsService);
//# sourceMappingURL=subscriptions.service.js.map
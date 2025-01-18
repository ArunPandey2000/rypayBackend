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
exports.CoinTransactionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const coins_entity_1 = require("../core/entities/coins.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const redemption_rules_entity_1 = require("../core/entities/redemption-rules.entity");
const wallet_queue_1 = require("../wallet/services/wallet.queue");
let CoinTransactionService = class CoinTransactionService {
    constructor(coinTransactionRepository, redemptionRuleRepository, userRepository, walletBridge) {
        this.coinTransactionRepository = coinTransactionRepository;
        this.redemptionRuleRepository = redemptionRuleRepository;
        this.userRepository = userRepository;
        this.walletBridge = walletBridge;
    }
    async addCoins(userId, coinAmount, mainWalletTransactionId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.ForbiddenException('user does not have enough permission');
        }
        const coinTransaction = this.coinTransactionRepository.create({
            user: { id: userId },
            coinAmount,
            mainWalletTransactionId,
        });
        await this.coinTransactionRepository.save(coinTransaction);
    }
    async getTotalUnexpiredCoins(userId) {
        const currentDate = new Date();
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
        const unexpiredCoins = await this.coinTransactionRepository.find({
            where: {
                user: { id: userId },
                isExpired: false,
                created_at: (0, typeorm_2.Between)(twelveMonthsAgo, currentDate),
                coinAmount: (0, typeorm_2.MoreThan)(0),
            },
        });
        return unexpiredCoins.reduce((sum, txn) => sum + (Number.parseFloat(txn.coinAmount?.toString()) || 0), 0);
    }
    async getTransactions(userId) {
        return this.coinTransactionRepository.find({
            where: { user: { id: userId } },
            order: { created_at: 'DESC' },
        });
    }
    async validateYearRedemption(userId) {
        const currentDate = new Date();
        const yearStart = new Date(currentDate.getFullYear(), 0, 1);
        const yearEnd = new Date(currentDate.getFullYear(), 11, 31);
        const yearRedemptions = await this.coinTransactionRepository.find({
            where: {
                user: { id: userId },
                redemptionValue: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                created_at: (0, typeorm_2.Between)(yearStart, yearEnd),
            },
        });
        const totalYearRedemption = yearRedemptions.reduce((sum, txn) => sum + (Number.parseFloat(txn.redemptionValue?.toString()) || 0), 0);
        if (totalYearRedemption >= 1200) {
            throw new common_1.BadRequestException('You have reached the annual redemption limit of ₹1,200.');
        }
    }
    async validateMonthlyRedemption(userId) {
        const currentDate = new Date();
        const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
        const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
        const monthRedemptions = await this.coinTransactionRepository.find({
            where: {
                user: { id: userId },
                redemptionValue: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
                created_at: (0, typeorm_2.Between)(monthStart, monthEnd),
            },
        });
        const totalMonthRedemption = monthRedemptions.reduce((sum, txn) => sum + (Number.parseFloat(txn.redemptionValue?.toString()) || 0), 0);
        if (totalMonthRedemption >= 1000) {
            throw new common_1.BadRequestException('You have reached the monthly redemption limit of ₹100.');
        }
    }
    async getCoins(userId) {
        const totalUnExpiredCoins = await this.getTotalUnexpiredCoins(userId);
        const redeemedEntries = await this.coinTransactionRepository.find({
            where: {
                user: { id: userId },
                redemptionValue: (0, typeorm_2.Not)((0, typeorm_2.IsNull)()),
            },
        });
        const totalRedeemAmount = redeemedEntries.reduce((sum, txn) => sum + (Number.parseFloat(txn.redemptionValue?.toString()) || 0), 0);
        return {
            amountRedeemed: totalRedeemAmount,
            availableCoins: totalUnExpiredCoins
        };
    }
    async redeemCoins(userId, redemptionId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        if (!user) {
            throw new common_1.ForbiddenException('User does not have enough permission');
        }
        await this.validateYearRedemption(userId);
        await this.validateMonthlyRedemption(userId);
        const redemptionRule = await this.redemptionRuleRepository.findOne({ where: { id: redemptionId } });
        if (!redemptionRule) {
            throw new common_1.NotFoundException('Invalid redemption option.');
        }
        const totalCoins = await this.getTotalUnexpiredCoins(userId);
        if (totalCoins < Number.parseFloat(redemptionRule.requiredCoins?.toString())) {
            throw new common_1.BadRequestException('Insufficient unexpired coins for this redemption.');
        }
        await this.deductCoins(userId, Number.parseFloat(redemptionRule.requiredCoins?.toString()));
        const coinTransaction = this.coinTransactionRepository.create({
            user: user,
            coinAmount: -(Number.parseFloat(redemptionRule.requiredCoins?.toString())),
            redemptionValue: Number.parseFloat(redemptionRule.redemptionValue?.toString()),
        });
        await this.coinTransactionRepository.save(coinTransaction);
        await this.walletBridge.add('redeem', {
            ...coinTransaction,
            redemptionValue: Number.parseFloat(coinTransaction.redemptionValue?.toString()),
        });
        return {
            message: `Successfully redeemed ${redemptionRule.requiredCoins} RyCoins for ₹${redemptionRule.redemptionValue}.`,
            redemptionValue: redemptionRule.redemptionValue,
        };
    }
    async deductCoins(userId, requiredCoins) {
        const currentDate = new Date();
        const twelveMonthsAgo = new Date();
        twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
        const unexpiredEntries = await this.coinTransactionRepository.find({
            where: {
                user: { id: userId },
                isExpired: false,
                created_at: (0, typeorm_2.Between)(twelveMonthsAgo, currentDate),
                coinAmount: (0, typeorm_2.MoreThan)(0),
            },
            order: { created_at: 'ASC' },
        });
        let remainingCoins = requiredCoins;
        for (const entry of unexpiredEntries) {
            if (remainingCoins <= 0)
                break;
            const coinAmount = Number.parseFloat(entry.coinAmount?.toString());
            if (coinAmount <= remainingCoins) {
                remainingCoins -= coinAmount;
                entry.coinAmount = 0;
            }
            else {
                entry.coinAmount -= remainingCoins;
                remainingCoins = 0;
            }
            await this.coinTransactionRepository.save(entry);
        }
        if (remainingCoins > 0) {
            throw new common_1.BadRequestException('Insufficient unexpired coins to redeem.');
        }
    }
    async getRedemptionRules() {
        return this.redemptionRuleRepository.find({ order: { requiredCoins: 'ASC' } });
    }
};
exports.CoinTransactionService = CoinTransactionService;
exports.CoinTransactionService = CoinTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(coins_entity_1.CoinTransaction)),
    __param(1, (0, typeorm_1.InjectRepository)(redemption_rules_entity_1.RedemptionRule)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        wallet_queue_1.WalletBridge])
], CoinTransactionService);
//# sourceMappingURL=coins.service.js.map
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
exports.CoinsController = void 0;
const common_1 = require("@nestjs/common");
const redemption_rules_dto_1 = require("./dto/redemption-rules.dto");
const coins_service_1 = require("./coins.service");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const add_coin_dto_1 = require("./dto/add-coin.dto");
let CoinsController = class CoinsController {
    constructor(coinsService) {
        this.coinsService = coinsService;
    }
    async getRedemptionOptions() {
        return this.coinsService.getRedemptionRules();
    }
    async getCoins(req) {
        return this.coinsService.getCoins(req.user.sub);
    }
    async addCoins(req, body) {
        await this.coinsService.addCoins(req.user.sub, 5000, '1');
        return "Success";
    }
    async redeemCoins(req, redemptionId) {
        return this.coinsService.redeemCoins(req.user.sub, redemptionId);
    }
};
exports.CoinsController = CoinsController;
__decorate([
    (0, common_1.Get)('/redeem-options'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available redemption options',
        description: 'Fetches a list of available redemption rules with RyCoin to ₹ value mappings.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Redemption options retrieved successfully.',
        type: [redemption_rules_dto_1.RedemptionRuleDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No redemption options found.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoinsController.prototype, "getRedemptionOptions", null);
__decorate([
    (0, common_1.Get)('/coins'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get available coins',
        description: 'returns user available coins',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'user available coins.',
        type: redemption_rules_dto_1.CoinsDto,
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No redemption options found.',
    }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoinsController.prototype, "getCoins", null);
__decorate([
    (0, common_1.Post)('/add-coin'),
    (0, swagger_1.ApiOperation)({
        summary: 'Add coins',
        description: 'Add coins for test.',
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Redemption options retrieved successfully.',
        type: [redemption_rules_dto_1.RedemptionRuleDto],
    }),
    (0, swagger_1.ApiResponse)({
        status: 404,
        description: 'No redemption options found.',
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, add_coin_dto_1.AddCoinDto]),
    __metadata("design:returntype", Promise)
], CoinsController.prototype, "addCoins", null);
__decorate([
    (0, common_1.Post)('/redeem/:redemptionId'),
    (0, swagger_1.ApiOperation)({
        summary: 'Redeem RyCoins for a value in ₹',
        description: 'Redeems RyCoins for a specific value in ₹ based on selected redemption rule.',
    }),
    (0, swagger_1.ApiParam)({
        type: 'string',
        name: 'redemptionId'
    }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Successfully redeemed RyCoins for the selected ₹ value.',
        schema: {
            type: 'object',
            properties: {
                message: { type: 'string', example: 'Successfully redeemed 5000 RyCoins for ₹25.' },
                redemptionValue: { type: 'number', example: 25 },
            },
        },
    }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('redemptionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], CoinsController.prototype, "redeemCoins", null);
exports.CoinsController = CoinsController = __decorate([
    (0, common_1.Controller)('coins'),
    (0, swagger_1.ApiTags)('Coins'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [coins_service_1.CoinTransactionService])
], CoinsController);
//# sourceMappingURL=coins.controller.js.map
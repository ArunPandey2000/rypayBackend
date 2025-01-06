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
exports.WalletController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const hash_util_1 = require("../../core/utils/hash.util");
const transfer_money_dto_1 = require("../dto/transfer-money.dto");
const wallet_service_1 = require("../services/wallet.service");
const admin_guard_1 = require("../../auth/guards/admin.guard");
let WalletController = class WalletController {
    constructor(walletService) {
        this.walletService = walletService;
    }
    async getWalletQr(req, res) {
        const content = await this.walletService.getWalletQRCode({ user: { id: req.user.sub } });
        res.set({
            'Content-Type': 'text/html'
        });
        res.send(content);
    }
    async getWalletDetailsByWalletId(walletId) {
        return await this.walletService.getWallet({
            walletAccountNo: walletId
        });
    }
    async getWalletDetailsByUserId(userId) {
        return await this.walletService.getWallet({
            user: {
                id: userId
            }
        });
    }
    async getWalletDetailsByPhone(phoneNumber) {
        return await this.walletService.getWallet({
            user: { phoneNumber: phoneNumber }
        });
    }
    async getWallet(req) {
        return await this.walletService.getWallet({
            user: { id: req.user.sub },
        });
    }
    async updateMoneyToWallet(userId, fundMyAccountDto) {
        const reference = (0, hash_util_1.generateRef)(10);
        const transactionHash = (0, hash_util_1.generateHash)();
        fundMyAccountDto.reference = reference;
        fundMyAccountDto.transactionHash = transactionHash;
        const wallet = await this.walletService.UpdateMoneyToWallet(fundMyAccountDto, userId);
        return wallet;
    }
    async transferToUserByPhone(req, transferAccountDto) {
        const reference = (0, hash_util_1.generateRef)(10);
        const transactionHash = (0, hash_util_1.generateHash)();
        transferAccountDto.reference = reference;
        transferAccountDto.transactionHash = transactionHash;
        await this.walletService.processFundTransfer(transferAccountDto, req);
        return {
            message: `Wallet Fund Transfer To ${transferAccountDto.receiverAccountNo} was successful`,
            isSuccess: true
        };
    }
    async getDetails(req) {
        const accountNumber = req.params.accountNumber;
        if (!accountNumber) {
            throw new common_1.BadRequestException('Account number is required');
        }
        if (accountNumber.length !== 10) {
            throw new common_1.BadRequestException('Account number must be 10 characters long');
        }
        const details = await this.walletService.getOne({
            walletAccountNo: String(accountNumber),
        });
        if (!details) {
            throw new common_1.BadRequestException(`It seems this account number ${accountNumber} does not exist in our records`);
        }
        const data = {
            accountName: `${details.user.firstName} ${details.user.lastName}`,
            accountNumber: details.walletAccountNo,
        };
        return {
            data,
            message: `Account wallet details fetched successfully`
        };
    }
};
exports.WalletController = WalletController;
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.Get)('qr'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletQr", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to get wallet details by wallet id' }),
    (0, common_1.Get)('/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletDetailsByWalletId", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to get wallet details by user id | ADMIN' }),
    (0, common_1.Get)('/user/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletDetailsByUserId", null);
__decorate([
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to get wallet details by phone' }),
    (0, common_1.Get)('/mobile/:number'),
    __param(0, (0, common_1.Param)('number')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWalletDetailsByPhone", null);
__decorate([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getWallet", null);
__decorate([
    (0, common_1.Post)('update-money/:userId'),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, transfer_money_dto_1.AddMoneyToWalletDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "updateMoneyToWallet", null);
__decorate([
    (0, common_1.Post)('transfer-to-user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transfer_money_dto_1.TransferMoneyDto]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "transferToUserByPhone", null);
__decorate([
    (0, common_1.Get)('get-details/:accountNumber'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], WalletController.prototype, "getDetails", null);
exports.WalletController = WalletController = __decorate([
    (0, common_1.Controller)('wallet'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiTags)('Wallet'),
    __metadata("design:paramtypes", [wallet_service_1.WalletService])
], WalletController);
//# sourceMappingURL=wallet.controller.js.map
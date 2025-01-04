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
exports.TransactionDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class TransactionUser {
    constructor(user) {
        this.name = `${user.firstName} ${user.lastName}`;
        this.phoneNumber = user.phoneNumber;
    }
}
class TransactionDetailDto {
    constructor(transaction, senderUser, receiver) {
        this.amount = transaction.amount;
        this.walletBalanceBefore = transaction.walletBalanceBefore;
        this.walletBalanceAfter = transaction.walletBalanceAfter;
        this.sender = senderUser ? new TransactionUser(senderUser) : null;
        this.receiver = receiver ? new TransactionUser(receiver) : null;
        this.reference = transaction.reference;
        this.description = transaction.description;
        this.transactionHash = transaction.transactionHash;
        this.transactionType = transaction.type;
        this.transactionDate = transaction.transactionDate;
        this.createdAt = transaction.createdAt;
        this.serviceUsed = transaction.serviceUsed;
        this.updatedAt = transaction.updatedAt;
        this.accountNumber = transaction.receiver;
    }
}
exports.TransactionDetailDto = TransactionDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TransactionDetailDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TransactionDetailDto.prototype, "walletBalanceBefore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TransactionDetailDto.prototype, "walletBalanceAfter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "accountNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", TransactionUser)
], TransactionDetailDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", TransactionUser)
], TransactionDetailDto.prototype, "receiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "transactionHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TransactionDetailDto.prototype, "transactionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TransactionDetailDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransactionDetailDto.prototype, "serviceUsed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], TransactionDetailDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=transaction-detail.dto.js.map
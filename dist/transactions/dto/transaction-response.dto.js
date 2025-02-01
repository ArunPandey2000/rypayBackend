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
exports.TransactionResponseDto = exports.UserTransactionDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("../../core/entities/user.entity");
class UserTransactionDto {
}
exports.UserTransactionDto = UserTransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '1', description: 'Unique identifier for the user' }),
    __metadata("design:type", String)
], UserTransactionDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John', description: 'First name of the user' }),
    __metadata("design:type", String)
], UserTransactionDto.prototype, "firstName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Doe', description: 'Last name of the user' }),
    __metadata("design:type", String)
], UserTransactionDto.prototype, "lastName", void 0);
class TransactionResponseDto {
}
exports.TransactionResponseDto = TransactionResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Unique identifier for the transaction' }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Amount involved in the transaction' }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 50, description: 'Wallet balance before the transaction' }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "walletBalanceBefore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 150, description: 'Wallet balance after the transaction' }),
    __metadata("design:type", Number)
], TransactionResponseDto.prototype, "walletBalanceAfter", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'John Doe', description: 'Sender of the transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "sender", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Jane Doe', description: 'Receiver of the transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "receiver", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'REF123456', description: 'Reference code for the transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "reference", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Payment for services', description: 'Description of the transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '0xabc123...', description: 'Hash of the transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "transactionHash", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WALLET_TRANSFER', description: 'Type of transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "transactionType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-08-29T12:34:56Z', description: 'Date of the transaction' }),
    __metadata("design:type", Date)
], TransactionResponseDto.prototype, "transactionDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-08-29T12:34:56Z', description: 'Creation date of the transaction' }),
    __metadata("design:type", Date)
], TransactionResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'WALLET', description: 'Service used for the transaction' }),
    __metadata("design:type", String)
], TransactionResponseDto.prototype, "serviceUsed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-08-29T12:34:56Z', description: 'Last update date of the transaction' }),
    __metadata("design:type", Date)
], TransactionResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => UserTransactionDto, nullable: true, description: 'Details of the user involved in the transaction (in case of wallet)' }),
    __metadata("design:type", UserTransactionDto)
], TransactionResponseDto.prototype, "counterPartyUser", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => user_entity_1.User, nullable: true, description: 'Details of the user' }),
    __metadata("design:type", UserTransactionDto)
], TransactionResponseDto.prototype, "user", void 0);
//# sourceMappingURL=transaction-response.dto.js.map
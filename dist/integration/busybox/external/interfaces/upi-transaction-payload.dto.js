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
exports.TransactionDto = exports.TransactionDataDto = exports.PaymentType = exports.PaymentStatus = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
var PaymentStatus;
(function (PaymentStatus) {
    PaymentStatus["SUCCESS"] = "SUCCESS";
    PaymentStatus["FAILED"] = "FAILED";
    PaymentStatus["PENDING"] = "PENDING";
})(PaymentStatus || (exports.PaymentStatus = PaymentStatus = {}));
var PaymentType;
(function (PaymentType) {
    PaymentType["Credit"] = "Credit";
    PaymentType["Debit"] = "Debit";
})(PaymentType || (exports.PaymentType = PaymentType = {}));
class TransactionDataDto {
}
exports.TransactionDataDto = TransactionDataDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TEBPTR0016' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "transcation_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sathyaTest-1706550855' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "reference_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'TEBPOD0015' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "order_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '9378738535' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "account_number", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UTIB0CCH274' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "ifsc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'sathya@ybl' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "upi", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionDataDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'UPI' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "payment_mode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "payment_remark", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Collected Successfully' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "statusDescription", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PaymentStatus }),
    (0, class_validator_1.IsEnum)(PaymentStatus),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '242424242424' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "utr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "holderName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: PaymentType }),
    (0, class_validator_1.IsEnum)(PaymentType),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionDataDto.prototype, "charge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionDataDto.prototype, "gst", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-29T17:54:41.849Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2024-01-29T17:54:42.455Z' }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], TransactionDataDto.prototype, "updatedAt", void 0);
class TransactionDto {
}
exports.TransactionDto = TransactionDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], TransactionDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 200 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], TransactionDto.prototype, "statusCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: TransactionDataDto }),
    __metadata("design:type", TransactionDataDto)
], TransactionDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransactionDto.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DYNAMIC_UPI_COLLECTION' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransactionDto.prototype, "event", void 0);
//# sourceMappingURL=upi-transaction-payload.dto.js.map
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
exports.PrintableTransactionQueryDto = exports.TransactionQueryDto = exports.PaginationRequestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const sort_direction_enum_1 = require("../enum/sort-direction.enum");
const transaction_type_enum_1 = require("../enum/transaction-type.enum");
class PaginationRequestDto {
}
exports.PaginationRequestDto = PaginationRequestDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], PaginationRequestDto.prototype, "page", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationRequestDto.prototype, "pageSize", void 0);
class TransactionQueryDto {
}
exports.TransactionQueryDto = TransactionQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", PaginationRequestDto)
], TransactionQueryDto.prototype, "pagination", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.fromDate !== undefined && o.fromDate !== ''),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], TransactionQueryDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.toDate !== undefined && o.toDate !== ''),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransactionQueryDto.prototype, "toDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TransactionQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(sort_direction_enum_1.SORT_DIRECTIONS),
    __metadata("design:type", String)
], TransactionQueryDto.prototype, "sortDirection", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.transactionType !== undefined && o.transactionType !== ''),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(transaction_type_enum_1.TransactionType),
    __metadata("design:type", String)
], TransactionQueryDto.prototype, "transactionType", void 0);
class PrintableTransactionQueryDto {
}
exports.PrintableTransactionQueryDto = PrintableTransactionQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", PaginationRequestDto)
], PrintableTransactionQueryDto.prototype, "pagination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], PrintableTransactionQueryDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateIf)(o => o.toDate !== undefined && o.toDate !== ''),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PrintableTransactionQueryDto.prototype, "toDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], PrintableTransactionQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(sort_direction_enum_1.SORT_DIRECTIONS),
    __metadata("design:type", String)
], PrintableTransactionQueryDto.prototype, "sortDirection", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.transactionType !== undefined && o.transactionType !== ''),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(transaction_type_enum_1.TransactionType),
    __metadata("design:type", String)
], PrintableTransactionQueryDto.prototype, "transactionType", void 0);
//# sourceMappingURL=get-transactions.dto.js.map
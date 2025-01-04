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
exports.MoneyRequestDto = exports.MoneyRequestQueryDto = exports.MoneyRequestResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const get_transactions_dto_1 = require("../../transactions/dto/get-transactions.dto");
const sort_direction_enum_1 = require("../../transactions/enum/sort-direction.enum");
class MoneyRequestResponseDto {
}
exports.MoneyRequestResponseDto = MoneyRequestResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Boolean)
], MoneyRequestResponseDto.prototype, "isSuccess", void 0);
class MoneyRequestQueryDto {
}
exports.MoneyRequestQueryDto = MoneyRequestQueryDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", get_transactions_dto_1.PaginationRequestDto)
], MoneyRequestQueryDto.prototype, "pagination", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.fromDate !== undefined && o.fromDate !== ''),
    (0, class_validator_1.IsDateString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], MoneyRequestQueryDto.prototype, "fromDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.ValidateIf)(o => o.toDate !== undefined && o.toDate !== ''),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MoneyRequestQueryDto.prototype, "toDate", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MoneyRequestQueryDto.prototype, "search", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, swagger_1.ApiPropertyOptional)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(sort_direction_enum_1.SORT_DIRECTIONS),
    __metadata("design:type", String)
], MoneyRequestQueryDto.prototype, "sortDirection", void 0);
__decorate([
    (0, class_validator_1.ValidateIf)(o => o.status !== undefined && o.status !== ''),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], MoneyRequestQueryDto.prototype, "status", void 0);
class MoneyRequestDto {
    constructor(data) {
        this.UTR = data.UTR;
        this.createdAt = data.createdAt;
        this.modeOfPayment = data.modeOfPayment;
        this.paidAmount = data.paidAmount;
        this.status = data.status;
        this.updatedAt = data.updatedAt;
    }
}
exports.MoneyRequestDto = MoneyRequestDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MoneyRequestDto.prototype, "paidAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MoneyRequestDto.prototype, "modeOfPayment", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MoneyRequestDto.prototype, "UTR", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], MoneyRequestDto.prototype, "paidAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], MoneyRequestDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MoneyRequestDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], MoneyRequestDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=money-request.dto.js.map
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
exports.CreateLoanDto = exports.IsDateInFuture = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
let IsDateInFuture = class IsDateInFuture {
    validate(date, args) {
        return date ? new Date(date).getTime() > Date.now() : true;
    }
    defaultMessage(args) {
        return 'Overdue date should not be in the past';
    }
};
exports.IsDateInFuture = IsDateInFuture;
exports.IsDateInFuture = IsDateInFuture = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ async: false })
], IsDateInFuture);
class CreateLoanDto {
}
exports.CreateLoanDto = CreateLoanDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Unique ID from another system',
        example: 'LN12345',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateLoanDto.prototype, "loanId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Amount for each installment',
        example: 2000,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "installmentAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Overdue amount (if any)',
        example: 0,
        required: false,
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "overdueAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Overdue date',
    }),
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.Validate)(IsDateInFuture, {
        message: 'Overdue date should not be in the past',
    }),
    __metadata("design:type", Date)
], CreateLoanDto.prototype, "installmentDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Total amount of the loan',
        example: 50000,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsPositive)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "totalAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'User ID associated with the loan',
        example: 1,
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateLoanDto.prototype, "userId", void 0);
//# sourceMappingURL=create-loan.dto.js.map
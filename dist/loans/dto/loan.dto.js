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
exports.LoanAdminResponseDto = exports.LoanResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LoanResponseDto {
    constructor(loanEntity) {
        this.id = loanEntity.id;
        this.loanAccount = loanEntity.loanAccount;
        this.loanStatus = loanEntity.loanStatus;
        this.totalAmountPayable = Number.parseFloat(loanEntity.overdueAmount.toString()) + Number.parseFloat(loanEntity.installmentAmount.toString());
        this.dueDate = loanEntity.dueDate;
    }
}
exports.LoanResponseDto = LoanResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique identifier',
        example: '1',
    }),
    __metadata("design:type", Number)
], LoanResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The unique loan identifier',
        example: 'LN12345',
    }),
    __metadata("design:type", String)
], LoanResponseDto.prototype, "loanAccount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The total loan amount',
        example: 2000.00,
    }),
    __metadata("design:type", Number)
], LoanResponseDto.prototype, "totalAmountPayable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The current status of the loan',
        enum: ['Pending', 'PartiallyPaid', 'Paid'],
        example: 'Pending',
    }),
    __metadata("design:type", String)
], LoanResponseDto.prototype, "loanStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'laon overdue date',
        example: '2024-12-29T00:00:00Z',
    }),
    __metadata("design:type", Date)
], LoanResponseDto.prototype, "dueDate", void 0);
class LoanAdminResponseDto extends LoanResponseDto {
    constructor(loanEntity) {
        super(loanEntity);
        this.totalLoanAmount = loanEntity.totalAmount;
        this.updatedAt = loanEntity.updatedAt,
            this.createdAt = loanEntity.createdAt;
    }
}
exports.LoanAdminResponseDto = LoanAdminResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date when the loan was last updated',
        example: '2024-12-29T00:00:00Z',
    }),
    __metadata("design:type", Date)
], LoanAdminResponseDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The date when the loan was last updated',
        example: '2024-12-29T00:00:00Z',
    }),
    __metadata("design:type", Date)
], LoanAdminResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'The total Loan amount',
        example: 500000,
    }),
    __metadata("design:type", Number)
], LoanAdminResponseDto.prototype, "totalLoanAmount", void 0);
//# sourceMappingURL=loan.dto.js.map
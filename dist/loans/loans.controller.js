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
exports.LoansController = void 0;
const common_1 = require("@nestjs/common");
const loans_service_1 = require("./loans.service");
const create_loan_dto_1 = require("./dto/create-loan.dto");
const update_loan_dto_1 = require("./dto/update-loan.dto");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const admin_guard_1 = require("../auth/guards/admin.guard");
const loan_dto_1 = require("./dto/loan.dto");
const pay_loan_dto_1 = require("./dto/pay-loan.dto");
let LoansController = class LoansController {
    constructor(loansService) {
        this.loansService = loansService;
    }
    create(createLoanDto) {
        return this.loansService.createLoan(createLoanDto);
    }
    findAll() {
        return this.loansService.findAllLoans();
    }
    findAllLoansOfUser(req) {
        return this.loansService.findAllUserLoans(req.user.sub);
    }
    findOne(id) {
        return this.loansService.findOne(+id);
    }
    update(id, updateLoanDto) {
        return this.loansService.updateLoan(+id, updateLoanDto);
    }
    remove(id) {
        return this.loansService.remove(+id);
    }
    PayLoan(req, loanPaymentDto) {
        return this.loansService.payLoan(req.user.sub, loanPaymentDto);
    }
};
exports.LoansController = LoansController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new loan' }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The loan has been successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input data.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_loan_dto_1.CreateLoanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all loans' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: loan_dto_1.LoanAdminResponseDto, description: 'List of all loans.' }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('/user'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all loans of user' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: loan_dto_1.LoanResponseDto, description: 'List of all loans of user.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findAllLoansOfUser", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get loan by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Loan details.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Loan not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'updates loan data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The loan has been updated.' }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Loan not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_loan_dto_1.UpdateLoanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'delete loan data' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The loan has been deleted.' }),
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Loan not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('/pay'),
    (0, swagger_1.ApiOperation)({ summary: 'pay loan' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Loan amount paid by user.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Loan Id not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, pay_loan_dto_1.PayloanDto]),
    __metadata("design:returntype", void 0)
], LoansController.prototype, "PayLoan", null);
exports.LoansController = LoansController = __decorate([
    (0, swagger_1.ApiTags)('Loans'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Controller)('loans'),
    __metadata("design:paramtypes", [loans_service_1.LoansService])
], LoansController);
//# sourceMappingURL=loans.controller.js.map
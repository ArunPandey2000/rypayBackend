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
exports.UpdateWalletAfterRechargeDto = exports.DeductWalletBalanceRechargeDto = exports.TransferMoneyDto = exports.AddMoneyToWalletDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AddMoneyToWalletDto {
}
exports.AddMoneyToWalletDto = AddMoneyToWalletDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], AddMoneyToWalletDto.prototype, "amount", void 0);
class TransferMoneyDto {
}
exports.TransferMoneyDto = TransferMoneyDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TransferMoneyDto.prototype, "amount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransferMoneyDto.prototype, "message", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TransferMoneyDto.prototype, "receiverAccountNo", void 0);
class DeductWalletBalanceRechargeDto {
}
exports.DeductWalletBalanceRechargeDto = DeductWalletBalanceRechargeDto;
class UpdateWalletAfterRechargeDto extends DeductWalletBalanceRechargeDto {
}
exports.UpdateWalletAfterRechargeDto = UpdateWalletAfterRechargeDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], UpdateWalletAfterRechargeDto.prototype, "amount", void 0);
//# sourceMappingURL=transfer-money.dto.js.map
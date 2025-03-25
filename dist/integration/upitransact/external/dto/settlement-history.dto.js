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
exports.MergedDataResponseDTO = exports.SettlementHistoryDTO = void 0;
const swagger_1 = require("@nestjs/swagger");
class SettlementHistoryDTO {
}
exports.SettlementHistoryDTO = SettlementHistoryDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2025-03-14' }),
    __metadata("design:type", String)
], SettlementHistoryDTO.prototype, "date", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10 }),
    __metadata("design:type", Number)
], SettlementHistoryDTO.prototype, "totalAmountSettled", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SUCCESS' }),
    __metadata("design:type", String)
], SettlementHistoryDTO.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '25031610PSNFP002751' }),
    __metadata("design:type", String)
], SettlementHistoryDTO.prototype, "bankReferenceNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'YESBN12025031605334037' }),
    __metadata("design:type", String)
], SettlementHistoryDTO.prototype, "UTR", void 0);
class MergedDataResponseDTO {
}
exports.MergedDataResponseDTO = MergedDataResponseDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 11, description: 'Total amount collected today' }),
    __metadata("design:type", Number)
], MergedDataResponseDTO.prototype, "todayTotalCollection", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 11, description: 'Total amount settled today that will be available tomorrow' }),
    __metadata("design:type", Number)
], MergedDataResponseDTO.prototype, "todayTotalSettlementForTomorrow", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SettlementHistoryDTO], description: 'Settlement history grouped by date' }),
    __metadata("design:type", Array)
], MergedDataResponseDTO.prototype, "settlementHistory", void 0);
//# sourceMappingURL=settlement-history.dto.js.map
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
exports.FetchBillResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class FetchBillResponse {
    constructor(billResponse) {
        this.billAmount = billResponse.billAmount;
        this.billNumber = billResponse.billNumber;
        this.billPeriod = billResponse.billPeriod;
        this.customerName = billResponse.billName;
        this.remarks = billResponse.billRemark;
        this.dueDate = billResponse.dueDate;
        this.billName = billResponse.billName;
        this.providerName = billResponse.bbpsName;
        this.message = billResponse.resText;
    }
}
exports.FetchBillResponse = FetchBillResponse;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "billAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "dueDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "remarks", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "customerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "billNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "providerName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "billPeriod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "billName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], FetchBillResponse.prototype, "message", void 0);
//# sourceMappingURL=bill-response.dto.js.map
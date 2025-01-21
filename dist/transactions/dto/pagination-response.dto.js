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
exports.PaginatedResponseDto = exports.PaginationResponse = exports.Pagination = void 0;
const swagger_1 = require("@nestjs/swagger");
const transaction_response_dto_1 = require("./transaction-response.dto");
class Pagination {
    PaginateResponse(data, total, page, limit) {
        return {
            data,
            pagination: {
                page: Number(page),
                pageSize: Number(limit),
                totalRecords: total,
                pageCount: Math.ceil(total / limit),
                hasPreviousPage: page > 1,
                hasNextPage: page < Math.ceil(total / limit),
            },
        };
    }
}
exports.Pagination = Pagination;
class PaginationResponse {
}
exports.PaginationResponse = PaginationResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1, description: 'Current page number' }),
    __metadata("design:type", Number)
], PaginationResponse.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10, description: 'Number of items per page' }),
    __metadata("design:type", Number)
], PaginationResponse.prototype, "pageSize", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Total number of items' }),
    __metadata("design:type", Number)
], PaginationResponse.prototype, "totalRecords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100, description: 'Total number of pages' }),
    __metadata("design:type", Number)
], PaginationResponse.prototype, "pageCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: false, description: 'if there is items in previous page' }),
    __metadata("design:type", Boolean)
], PaginationResponse.prototype, "hasPreviousPage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'if there is items in next page' }),
    __metadata("design:type", Boolean)
], PaginationResponse.prototype, "hasNextPage", void 0);
class PaginatedResponseDto {
}
exports.PaginatedResponseDto = PaginatedResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [transaction_response_dto_1.TransactionResponseDto], description: 'List of items' }),
    __metadata("design:type", Array)
], PaginatedResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PaginationResponse)
], PaginatedResponseDto.prototype, "pagination", void 0);
//# sourceMappingURL=pagination-response.dto.js.map
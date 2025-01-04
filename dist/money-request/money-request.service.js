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
exports.MoneyRequestService = void 0;
const common_1 = require("@nestjs/common");
const account_details_constant_1 = require("./constants/account-details.constant");
const typeorm_1 = require("@nestjs/typeorm");
const money_request_entity_1 = require("../core/entities/money-request.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const money_request_dto_1 = require("./dto/money-request.dto");
const pagination_response_dto_1 = require("../transactions/dto/pagination-response.dto");
let MoneyRequestService = class MoneyRequestService {
    constructor(moneyRequestRepo, userRepo) {
        this.moneyRequestRepo = moneyRequestRepo;
        this.userRepo = userRepo;
    }
    async create(userId, createMoneyRequestDto) {
        let isSuccess = true;
        try {
            if (!userId) {
                throw new common_1.BadRequestException('userId not found');
            }
            const user = await this.userRepo.findOneBy({ id: userId });
            if (!user) {
                throw new common_1.ForbiddenException('user not found');
            }
            const moneyRequest = this.moneyRequestRepo.create({
                modeOfPayment: createMoneyRequestDto.modeOfPayment,
                paidAt: createMoneyRequestDto.paidAt,
                paidAmount: createMoneyRequestDto.paidAmount,
                UTR: createMoneyRequestDto.UTR,
                user: user
            });
            await this.moneyRequestRepo.save(moneyRequest);
        }
        catch (err) {
            isSuccess = false;
            throw err;
        }
        return {
            isSuccess
        };
    }
    async findAll(queryDto) {
        const { page = 1, pageSize = 10 } = queryDto.pagination || {};
        const skipRecords = pageSize * (page - 1);
        const { search, status, fromDate, toDate, sortDirection } = queryDto;
        const baseWhere = {
            ...(status && { status: status }),
            ...(fromDate && toDate && { paidAt: (0, typeorm_2.Between)(new Date(fromDate), new Date(toDate)) }),
        };
        let searchConditions = [];
        if (search) {
            searchConditions = [
                { UTR: (0, typeorm_2.Like)(`%${search}%`) },
                { modeOfPayment: (0, typeorm_2.Like)(`%${search}%`) },
            ];
        }
        const where = search ? [baseWhere, ...searchConditions] : baseWhere;
        const requests = await this.moneyRequestRepo.find({
            where: where,
            order: { createdAt: sortDirection },
            take: pageSize,
            skip: skipRecords,
        });
        const total = await this.moneyRequestRepo.count({ where: where });
        const result = requests.map((request) => new money_request_dto_1.MoneyRequestDto(request));
        return new pagination_response_dto_1.Pagination().PaginateResponse(result, total, page, pageSize);
    }
    getAccountDetails() {
        return [account_details_constant_1.AccountDetailsConst];
    }
    async findOne(id) {
        if (!id) {
            throw new common_1.BadRequestException('request id is required');
        }
        const data = await this.moneyRequestRepo.findOneBy({
            id
        });
        if (!data) {
            throw new common_1.NotFoundException('request not found');
        }
        return new money_request_dto_1.MoneyRequestDto(data);
    }
    async updateRequest(id, status) {
        let success = true;
        try {
            if (!id) {
                throw new common_1.BadRequestException('request id is required');
            }
            if (!Object.values(account_details_constant_1.AllowedStatuses).includes(status)) {
                throw new common_1.BadRequestException(`${status} is not allowed`);
            }
            const request = await this.moneyRequestRepo.findOneBy({ id: id });
            if (!request) {
                throw new common_1.BadRequestException('Request Id not found');
            }
            await this.moneyRequestRepo.update({ id: id }, {
                status
            });
        }
        catch (err) {
            success = false;
        }
        return {
            success
        };
    }
    remove(id) {
        return `This action removes a #${id} moneyRequest`;
    }
};
exports.MoneyRequestService = MoneyRequestService;
exports.MoneyRequestService = MoneyRequestService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(money_request_entity_1.MoneyRequest)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], MoneyRequestService);
//# sourceMappingURL=money-request.service.js.map
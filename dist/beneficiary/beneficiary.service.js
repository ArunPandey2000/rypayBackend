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
exports.BeneficiaryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const beneficiery_entity_1 = require("../core/entities/beneficiery.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const beneficiary_response_dto_1 = require("./dto/beneficiary-response.dto");
let BeneficiaryService = class BeneficiaryService {
    constructor(beneficiaryRepo, userRepo) {
        this.beneficiaryRepo = beneficiaryRepo;
        this.userRepo = userRepo;
    }
    async createBeneficiary(userId, createBeneficiaryDto) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('user not found');
        }
        const account = await this.beneficiaryRepo.findOne({
            where: {
                bankAccountNumber: createBeneficiaryDto.bankAccountNumber
            }
        });
        if (account) {
            throw new common_1.BadRequestException('Account number already exist with existing beneficiary');
        }
        await this.beneficiaryRepo.save({
            user,
            nameInBank: createBeneficiaryDto.name,
            ifscCode: createBeneficiaryDto.ifscCode,
            bankAccountNumber: createBeneficiaryDto.bankAccountNumber
        });
        return {
            message: "Success"
        };
    }
    async findAll(userId) {
        const beneficiaries = await this.beneficiaryRepo.find({
            where: {
                user: {
                    id: userId
                }
            }
        });
        return beneficiaries.map((beneficiary) => new beneficiary_response_dto_1.BeneficiaryResponseDto(beneficiary));
    }
    async update(userId, accountNumber, updateBeneficiaryDto) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('user not found');
        }
        const account = await this.beneficiaryRepo.findOne({
            where: {
                bankAccountNumber: accountNumber
            }
        });
        if (!account) {
            throw new common_1.BadRequestException('Account number does not exist');
        }
        await this.beneficiaryRepo.update({
            bankAccountNumber: accountNumber,
        }, {
            ifscCode: updateBeneficiaryDto.ifscCode,
            bankAccountNumber: updateBeneficiaryDto.bankAccountNumber,
            nameInBank: updateBeneficiaryDto.name
        });
        return {
            message: "Success"
        };
    }
    async remove(userId, accountNumber) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (!user) {
            throw new common_1.UnauthorizedException('user not found');
        }
        const account = await this.beneficiaryRepo.findOne({
            where: {
                bankAccountNumber: accountNumber
            }
        });
        if (!account) {
            throw new common_1.BadRequestException('Account number does not exist');
        }
        await this.beneficiaryRepo.delete({
            bankAccountNumber: accountNumber,
        });
        return {
            message: "Success"
        };
    }
};
exports.BeneficiaryService = BeneficiaryService;
exports.BeneficiaryService = BeneficiaryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(beneficiery_entity_1.Beneficiary)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], BeneficiaryService);
//# sourceMappingURL=beneficiary.service.js.map
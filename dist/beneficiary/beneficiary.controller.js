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
exports.BeneficiaryController = void 0;
const common_1 = require("@nestjs/common");
const beneficiary_service_1 = require("./beneficiary.service");
const create_beneficiary_dto_1 = require("./dto/create-beneficiary.dto");
const update_beneficiary_dto_1 = require("./dto/update-beneficiary.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
const swagger_1 = require("@nestjs/swagger");
const beneficiary_response_dto_1 = require("./dto/beneficiary-response.dto");
let BeneficiaryController = class BeneficiaryController {
    constructor(beneficiaryService) {
        this.beneficiaryService = beneficiaryService;
    }
    create(req, createBeneficiaryDto) {
        const userId = req.user.sub;
        return this.beneficiaryService.createBeneficiary(userId, createBeneficiaryDto);
    }
    findAll(req) {
        const userId = req.user.sub;
        return this.beneficiaryService.findAll(userId);
    }
    update(req, accountid, updateBeneficiaryDto) {
        const userId = req.user.sub;
        return this.beneficiaryService.update(userId, accountid, updateBeneficiaryDto);
    }
    remove(req, accountid) {
        const userId = req.user.sub;
        return this.beneficiaryService.remove(userId, accountid);
    }
};
exports.BeneficiaryController = BeneficiaryController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new beneficiary' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The beneficiary has been successfully created.', type: beneficiary_response_dto_1.MessageResponse }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'UnAuthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_beneficiary_dto_1.CreateBeneficiaryDto]),
    __metadata("design:returntype", void 0)
], BeneficiaryController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Gets a list of benificiaries' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns List of Benficiaries.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'UnAuthorized' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BeneficiaryController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':accountid'),
    (0, swagger_1.ApiOperation)({ summary: 'Updates a new beneficiary' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The Benficiary has been updated.' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'UnAuthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('accountid')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_beneficiary_dto_1.UpdateBeneficiaryDto]),
    __metadata("design:returntype", void 0)
], BeneficiaryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':accountid'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletes a new beneficiary' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The beneficiary has been deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'UnAuthorized' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('accountid')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BeneficiaryController.prototype, "remove", null);
exports.BeneficiaryController = BeneficiaryController = __decorate([
    (0, common_1.Controller)('beneficiary'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiTags)('Beneficiary'),
    __metadata("design:paramtypes", [beneficiary_service_1.BeneficiaryService])
], BeneficiaryController);
//# sourceMappingURL=beneficiary.controller.js.map
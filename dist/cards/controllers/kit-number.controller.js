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
exports.KitNumberController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const admin_guard_1 = require("../../auth/guards/admin.guard");
const kit_number_service_1 = require("../services/kit-number.service");
const kit_number_dto_1 = require("../dto/kit-number.dto");
const swagger_1 = require("@nestjs/swagger");
const kit_number_entity_1 = require("../../core/entities/kit-number.entity");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
let KitNumberController = class KitNumberController {
    constructor(kitNumberService) {
        this.kitNumberService = kitNumberService;
    }
    async create(createKitNumberDto) {
        return this.kitNumberService.create(createKitNumberDto);
    }
    async findAll() {
        return this.kitNumberService.findAll();
    }
    async findOne(id) {
        const kitNumber = await this.kitNumberService.findOne(id);
        if (!kitNumber) {
            throw new common_1.NotFoundException('Kit number not found');
        }
        return kitNumber;
    }
    async uploadCSV(file) {
        if (!file || file.mimetype !== 'text/csv') {
            throw new common_1.BadRequestException('Invalid file type');
        }
        await this.kitNumberService.populateKitNumbersFromCSV(file.buffer);
        return { message: 'Kit numbers have been successfully populated from CSV.' };
    }
    async uploadJSON(body) {
        await this.kitNumberService.populateKitNumbersFromJSON(body);
        return { message: 'Kit numbers have been successfully populated from JSON.' };
    }
};
exports.KitNumberController = KitNumberController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new kit number' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'The kit number has been successfully created.', type: kit_number_entity_1.KitNumber }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [kit_number_dto_1.CreateKitNumbersDto]),
    __metadata("design:returntype", Promise)
], KitNumberController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve all kit numbers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of all kit numbers.', type: [kit_number_entity_1.KitNumber] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], KitNumberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Retrieve a kit number by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'The kit number found by ID.', type: kit_number_entity_1.KitNumber }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Kit number not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KitNumberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('upload-csv'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        description: 'Upload a file',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to upload kit number data using csv file' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Kit numbers have been successfully populated from CSV.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid file format' }),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KitNumberController.prototype, "uploadCSV", null);
__decorate([
    (0, common_1.Post)('/bulk'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiBody)({
        description: 'JSON data containing an array of kit numbers',
        type: [kit_number_dto_1.CreateKitNumbersDto],
    }),
    (0, swagger_1.ApiOperation)({ summary: 'Endpoint to upload kit numbers' }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_guard_1.AdminGuard),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], KitNumberController.prototype, "uploadJSON", null);
exports.KitNumberController = KitNumberController = __decorate([
    (0, swagger_1.ApiTags)('Kit-numbers'),
    (0, common_1.Controller)('kit-numbers'),
    __metadata("design:paramtypes", [kit_number_service_1.KitNumberService])
], KitNumberController);
//# sourceMappingURL=kit-number.controller.js.map
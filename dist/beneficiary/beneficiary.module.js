"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeneficiaryModule = void 0;
const common_1 = require("@nestjs/common");
const beneficiary_service_1 = require("./beneficiary.service");
const beneficiary_controller_1 = require("./beneficiary.controller");
const typeorm_1 = require("@nestjs/typeorm");
const beneficiery_entity_1 = require("../core/entities/beneficiery.entity");
const user_entity_1 = require("../core/entities/user.entity");
let BeneficiaryModule = class BeneficiaryModule {
};
exports.BeneficiaryModule = BeneficiaryModule;
exports.BeneficiaryModule = BeneficiaryModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([beneficiery_entity_1.Beneficiary, user_entity_1.User])],
        controllers: [beneficiary_controller_1.BeneficiaryController],
        providers: [beneficiary_service_1.BeneficiaryService],
    })
], BeneficiaryModule);
//# sourceMappingURL=beneficiary.module.js.map
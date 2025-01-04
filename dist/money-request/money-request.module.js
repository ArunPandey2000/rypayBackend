"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyRequestModule = void 0;
const common_1 = require("@nestjs/common");
const money_request_service_1 = require("./money-request.service");
const money_request_controller_1 = require("./money-request.controller");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("../core/entities/user.entity");
const money_request_entity_1 = require("../core/entities/money-request.entity");
let MoneyRequestModule = class MoneyRequestModule {
};
exports.MoneyRequestModule = MoneyRequestModule;
exports.MoneyRequestModule = MoneyRequestModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, money_request_entity_1.MoneyRequest])],
        controllers: [money_request_controller_1.MoneyRequestController],
        providers: [money_request_service_1.MoneyRequestService],
    })
], MoneyRequestModule);
//# sourceMappingURL=money-request.module.js.map
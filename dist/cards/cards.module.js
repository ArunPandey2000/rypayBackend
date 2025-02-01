"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const integration_module_1 = require("../integration/integration.module");
const cards_controller_1 = require("./controllers/cards.controller");
const cards_service_1 = require("./services/cards.service");
const typeorm_1 = require("@nestjs/typeorm");
const card_entity_1 = require("../core/entities/card.entity");
const user_entity_1 = require("../core/entities/user.entity");
const kit_number_entity_1 = require("../core/entities/kit-number.entity");
const kit_number_controller_1 = require("./controllers/kit-number.controller");
const kit_number_service_1 = require("./services/kit-number.service");
const nestjs_pino_1 = require("nestjs-pino");
let CardsModule = class CardsModule {
};
exports.CardsModule = CardsModule;
exports.CardsModule = CardsModule = __decorate([
    (0, common_1.Module)({
        imports: [integration_module_1.IntegrationModule, nestjs_pino_1.LoggerModule.forRoot({
                pinoHttp: {
                    transport: {
                        target: 'pino-pretty',
                        options: {
                            singleLine: true,
                        },
                    },
                },
            }), config_1.ConfigModule, typeorm_1.TypeOrmModule.forFeature([card_entity_1.Card, user_entity_1.User, kit_number_entity_1.KitNumber])],
        providers: [cards_service_1.CardsService, kit_number_service_1.KitNumberService],
        controllers: [cards_controller_1.CardsController, kit_number_controller_1.KitNumberController],
        exports: [cards_service_1.CardsService, kit_number_service_1.KitNumberService]
    })
], CardsModule);
//# sourceMappingURL=cards.module.js.map
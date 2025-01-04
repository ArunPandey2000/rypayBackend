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
exports.SmsClientService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const otp_flow_constant_1 = require("./constant/otp-flow.constant");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const nestjs_pino_1 = require("nestjs-pino");
let SmsClientService = class SmsClientService {
    constructor(httpService, configService, logger) {
        this.httpService = httpService;
        this.configService = configService;
        this.logger = logger;
    }
    async sendOtpToPhone(phone, otp) {
        try {
            const payload = {
                ...otp_flow_constant_1.OTPFlowPayload,
                variables_values: `${otp}|`,
                numbers: phone,
            };
            const headerConfig = {
                headers: {
                    authorization: this.configService.get('SMS_CLIENT_KEY'),
                },
            };
            return (0, rxjs_1.lastValueFrom)(this.httpService.post(this.configService.get('SMS_CLIENT_URL'), payload, headerConfig));
        }
        catch (err) {
            this.logger.error('failed to send logs', err);
            throw err;
        }
    }
};
exports.SmsClientService = SmsClientService;
exports.SmsClientService = SmsClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, nestjs_pino_1.InjectPinoLogger)(SmsClientService.name)),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        nestjs_pino_1.Logger])
], SmsClientService);
//# sourceMappingURL=sms-client.service.js.map
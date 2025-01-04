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
exports.MerchantClientService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const access_token_client_service_1 = require("./access-token-client.service");
const card_status_fake_response_constant_1 = require("../external/constants/card-status-fake-response.constant");
const card_verification_fake_response_constant_1 = require("../external/constants/card-verification-fake-response.constant");
const issue_card_fake_response_constant_1 = require("../external/constants/issue-card-fake-response.constant");
let MerchantClientService = class MerchantClientService {
    constructor(httpService, configService, accessTokenService) {
        this.httpService = httpService;
        this.configService = configService;
        this.accessTokenService = accessTokenService;
    }
    async issueCard(data) {
        const config = await this.accessTokenService.getHeaderConfig();
        if (JSON.parse(this.configService.get('ENABLE_SANDBOX'))) {
            return (0, issue_card_fake_response_constant_1.getFakeIssueCardResponse)();
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/issuence`, data, config));
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async verifyRegistrationOtp(data) {
        const config = await this.accessTokenService.getHeaderConfig();
        if (JSON.parse(this.configService.get('ENABLE_SANDBOX'))) {
            return (0, card_verification_fake_response_constant_1.getFakeCardVerificationResponse)();
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/verify`, data, config));
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
    async getCustomerStatus(mobileNumber) {
        const config = await this.accessTokenService.getHeaderConfig();
        if (JSON.parse(this.configService.get('ENABLE_SANDBOX'))) {
            return (0, card_status_fake_response_constant_1.getFakeCardStatusResponse)();
        }
        try {
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(`${this.configService.get('BUSY_BOX_API_BASE_URL')}/${mobileNumber}`, config));
            return response.data;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.MerchantClientService = MerchantClientService;
exports.MerchantClientService = MerchantClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        config_1.ConfigService,
        access_token_client_service_1.AccessTokenClientService])
], MerchantClientService);
//# sourceMappingURL=merchant-client.service.js.map
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
exports.AccessTokenClientService = void 0;
const axios_1 = require("@nestjs/axios");
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const rxjs_1 = require("rxjs");
const access_token_cache_timeout_constant_1 = require("../external/constants/access-token-cache-timeout.constant");
let AccessTokenClientService = class AccessTokenClientService {
    constructor(httpService, cacheManager, configService) {
        this.httpService = httpService;
        this.cacheManager = cacheManager;
        this.configService = configService;
    }
    async getToken() {
        const token = (await this.cacheManager.get(access_token_cache_timeout_constant_1.BusyBoxAccessTokenCacheKey));
        if (token) {
            return token;
        }
        const url = `${this.configService.get('BUSY_BOX_API_BASE_URL')}/token`;
        const data = {
            username: this.configService.get('BUSY_BOX_ACCESS_TOKEN_USER_NAME'),
            password: this.configService.get('BUSY_BOX_ACCESS_TOKEN_USER_PASSWORD'),
        };
        try {
            const response = await (0, rxjs_1.lastValueFrom)(this.httpService.post(url, data));
            await this.cacheManager.set('', response.data.token, access_token_cache_timeout_constant_1.BusyBoxAccessTokenTTL);
            return response.data.token;
        }
        catch (error) {
            throw new Error(`Failed to get token: ${error.message}`);
        }
    }
    async getHeaderConfig(isBearerAuth = false) {
        const token = await this.getToken();
        return {
            headers: isBearerAuth ? {
                Authorization: `Bearer ${token}`
            } : {
                Token: token
            },
        };
    }
};
exports.AccessTokenClientService = AccessTokenClientService;
exports.AccessTokenClientService = AccessTokenClientService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(cache_manager_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [axios_1.HttpService, Object, config_1.ConfigService])
], AccessTokenClientService);
//# sourceMappingURL=access-token-client.service.js.map
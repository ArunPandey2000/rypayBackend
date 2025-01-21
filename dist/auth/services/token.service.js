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
exports.TokenService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const jwt_payload_constant_1 = require("../constants/jwt-payload.constant");
const refresh_token_entity_1 = require("../../core/entities/refresh-token.entity");
const user_entity_1 = require("../../core/entities/user.entity");
const user_response_dto_1 = require("../../users/dto/user-response.dto");
const auth_util_1 = require("../utils/auth.util");
let TokenService = class TokenService {
    constructor(jwtService, configService, userRepo, refreshTokenRepo) {
        this.jwtService = jwtService;
        this.configService = configService;
        this.userRepo = userRepo;
        this.refreshTokenRepo = refreshTokenRepo;
    }
    async createRefreshToken(userId, ttl) {
        const token = new refresh_token_entity_1.RefreshToken();
        token.userId = userId;
        token.isRevoked = false;
        const expiration = new Date();
        expiration.setTime(expiration.getTime() + ttl);
        token.expiredAt = expiration;
        return this.refreshTokenRepo.save(token);
    }
    async findTokenById(id) {
        return this.refreshTokenRepo.findOne({
            where: {
                id: id,
            },
        });
    }
    async resolveRefreshToken(encoded) {
        const payload = await this.decodeRefreshToken(encoded);
        const token = await this.getStoredTokenFromRefreshTokenPayload(payload);
        if (!token) {
            throw new common_1.UnprocessableEntityException('Refresh token not found');
        }
        if (token.isRevoked) {
            throw new common_1.UnprocessableEntityException('Refresh token revoked');
        }
        const user = await this.getUserFromRefreshTokenPayload(payload);
        if (!user) {
            throw new common_1.UnprocessableEntityException('Refresh token malformed');
        }
        return { user, token };
    }
    async createAccessTokenFromRefreshToken(refresh) {
        const { user } = await this.resolveRefreshToken(refresh);
        const userDto = new user_response_dto_1.UserResponse(user);
        const accessToken = await this.generateAccessToken(auth_util_1.AuthUtil.getAccessTokenPayloadFromUserModel(user));
        return { user: userDto, accessToken };
    }
    async decodeRefreshToken(token) {
        try {
            return this.jwtService.verifyAsync(token, {
                secret: process.env.JWT_REFRESH_SECRET,
            });
        }
        catch (e) {
            if (e instanceof jwt_1.TokenExpiredError) {
                throw new common_1.UnprocessableEntityException('Refresh token expired');
            }
            else {
                throw new common_1.UnprocessableEntityException('Refresh token malformed');
            }
        }
    }
    async getUserFromRefreshTokenPayload(payload) {
        const subId = payload.sub;
        if (!subId) {
            throw new common_1.UnprocessableEntityException('Refresh token malformed');
        }
        return this.userRepo.findOne({ where: { id: subId }, relations: { card: true, address: true, merchant: true } });
    }
    async getStoredTokenFromRefreshTokenPayload(payload) {
        const tokenId = payload.jti;
        if (!tokenId) {
            throw new common_1.UnprocessableEntityException('Refresh token malformed');
        }
        return this.findTokenById(tokenId);
    }
    async generateAccessToken(payload) {
        const basePayload = {
            ...jwt_payload_constant_1.BASE_OPTIONS,
            sub: payload.userId,
            role: payload.role,
            phone: payload.phoneNumber,
        };
        return this.jwtService.signAsync(basePayload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: jwt_payload_constant_1.ACCESS_TOKEN_EXPIRY,
        });
    }
    async revokeAccessToken(userId) {
        await this.refreshTokenRepo.delete({
            userId: userId,
        });
    }
    async generateTokens(tokenPayload) {
        const savedToken = await this.createRefreshToken(tokenPayload.userId, jwt_payload_constant_1.REFRESH_TOKEN_EXPIRY * 1000);
        const basePayload = {
            ...jwt_payload_constant_1.BASE_OPTIONS,
            sub: tokenPayload.userId,
            role: tokenPayload.role,
            phone: tokenPayload.phoneNumber,
        };
        const refreshTokenPayload = {
            ...basePayload,
            jti: savedToken.id,
        };
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(basePayload, {
                secret: this.configService.get('JWT_ACCESS_SECRET'),
                expiresIn: jwt_payload_constant_1.ACCESS_TOKEN_EXPIRY,
            }),
            this.jwtService.signAsync(refreshTokenPayload, {
                secret: this.configService.get('JWT_REFRESH_SECRET'),
                expiresIn: jwt_payload_constant_1.REFRESH_TOKEN_EXPIRY,
            }),
        ]);
        return {
            accessToken,
            refreshToken,
        };
    }
};
exports.TokenService = TokenService;
exports.TokenService = TokenService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(3, (0, typeorm_1.InjectRepository)(refresh_token_entity_1.RefreshToken)),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService,
        typeorm_2.Repository,
        typeorm_2.Repository])
], TokenService);
//# sourceMappingURL=token.service.js.map
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { TokenResponse } from '../dto/token-response.dto';
import { IAccessTokenUserPayload } from '../interfaces/user-token-request-payload.interface';
import { RefreshToken } from 'src/core/entities/refresh-token.entity';
import { User } from 'src/core/entities/user.entity';
import { UserResponse } from 'src/users/dto/user-response.dto';
export declare class TokenService {
    private jwtService;
    private configService;
    private userRepo;
    private refreshTokenRepo;
    constructor(jwtService: JwtService, configService: ConfigService, userRepo: Repository<User>, refreshTokenRepo: Repository<RefreshToken>);
    createRefreshToken(userId: string, ttl: number): Promise<RefreshToken>;
    findTokenById(id: string): Promise<RefreshToken | null>;
    resolveRefreshToken(encoded: string): Promise<{
        user: User;
        token: RefreshToken;
    }>;
    createAccessTokenFromRefreshToken(refresh: string): Promise<{
        accessToken: string;
        user: UserResponse;
    }>;
    private decodeRefreshToken;
    private getUserFromRefreshTokenPayload;
    private getStoredTokenFromRefreshTokenPayload;
    generateAccessToken(payload: any): Promise<string>;
    revokeAccessToken(userId: string): Promise<void>;
    generateTokens(tokenPayload: IAccessTokenUserPayload): Promise<TokenResponse>;
}

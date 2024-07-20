import { Injectable, UnprocessableEntityException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService, TokenExpiredError } from "@nestjs/jwt"
import { InjectRepository } from "@nestjs/typeorm"
import { Repository } from "typeorm"
import { ACCESS_TOKEN_EXPIRY, BASE_OPTIONS, REFRESH_TOKEN_EXPIRY } from "../constants/jwt-payload.constant"
import { TokenResponse } from "../dto/token-response.dto"
import { IRefreshTokenPayload } from "../interfaces/refresh-token-payload.interface"
import { IAccessTokenUserPayload } from "../interfaces/user-token-request-payload.interface"
import { RefreshToken } from "src/core/entities/refresh-token"

@Injectable()
export class TokenService {

  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(RefreshToken) private refreshTokenRepo: Repository<RefreshToken>) {

    }
  public async createRefreshToken (userId: string, ttl: number): Promise<RefreshToken> {
    const token = new RefreshToken()

    token.userId = userId
    token.isRevoked = false
    
    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)
    
    token.expiredAt = expiration

    return this.refreshTokenRepo.save(token);
  }

  public async findTokenById(id: string): Promise<RefreshToken | null> {
    return this.refreshTokenRepo.findOne({
      where: {
        userId: id
      }
    })
  }

//   public async resolveRefreshToken (encoded: string): Promise<{ user: User, token: RefreshToken }> {
//     const payload = await this.decodeRefreshToken(encoded)
//     const token = await this.getStoredTokenFromRefreshTokenPayload(payload)

//     if (!token) {
//       throw new UnprocessableEntityException('Refresh token not found')
//     }

//     if (token.isRevoked) {
//       throw new UnprocessableEntityException('Refresh token revoked')
//     }

//     const user = await this.getUserFromRefreshTokenPayload(payload)

//     if (!user) {
//       throw new UnprocessableEntityException('Refresh token malformed')
//     }

//     return { user, token }
//   }

//   public async createAccessTokenFromRefreshToken (refresh: string): Promise<{ token: string, user: User }> {
//     const { user } = await this.resolveRefreshToken(refresh)

//     const token = await this.generateAccessToken(user)

//     return { user, token }
//   }
  
  private async decodeRefreshToken (token: string): Promise<IRefreshTokenPayload> {
    try {
      return this.jwtService.verifyAsync(token)
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired')
      } else {
        throw new UnprocessableEntityException('Refresh token malformed') 
      }
    }
  }

//   private async getUserFromRefreshTokenPayload (payload: IRefreshTokenPayload): Promise<User> {
//     const subId = payload.sub

//     if (!subId) {
//       throw new UnprocessableEntityException('Refresh token malformed')
//     }
//     return this.usersService.findUserById(subId)
//   }

  private async getStoredTokenFromRefreshTokenPayload (payload: IRefreshTokenPayload): Promise<RefreshToken | null> {
    const tokenId = payload.jti

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return this.findTokenById(tokenId)
  }

  public async generateAccessToken (payload: any): Promise<string> {
    return this.jwtService.signAsync({}, payload)
  }

  async generateTokens(tokenPayload: IAccessTokenUserPayload): Promise<TokenResponse> {
    const savedToken = await this.createRefreshToken(tokenPayload.userId, 30 * 24 * 60 * 60);
    const basePayload = {
        ...BASE_OPTIONS,
        sub: tokenPayload.userId,
        role: tokenPayload.role,
        phone: tokenPayload.phoneNumber
    }
    const refreshTokenPayload = {
        ...basePayload,
        jit: savedToken.id,
        expired_at: savedToken.expiredAt,
    }
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        basePayload,
        {
          secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
          expiresIn: ACCESS_TOKEN_EXPIRY,
        },
      ),
      this.jwtService.signAsync(
        refreshTokenPayload,
        {
          secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
          expiresIn: REFRESH_TOKEN_EXPIRY,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
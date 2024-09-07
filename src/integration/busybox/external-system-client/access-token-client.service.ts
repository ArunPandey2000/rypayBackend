import { HttpService } from '@nestjs/axios';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { lastValueFrom } from 'rxjs';
import {
  BusyBoxAccessTokenCacheKey,
  BusyBoxAccessTokenTTL,
} from '../external/constants/access-token-cache-timeout.constant';

@Injectable()
export class AccessTokenClientService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {}

  async getToken(): Promise<string> {
    const token = (await this.cacheManager.get(
      BusyBoxAccessTokenCacheKey,
    )) as string;
    if (token) {
      return token;
    }
    const url = `${this.configService.get('BUSY_BOX_API_BASE_URL')}/token`;
    const data = {
      username: this.configService.get('BUSY_BOX_ACCESS_TOKEN_USER_NAME'),
      password: this.configService.get('BUSY_BOX_ACCESS_TOKEN_USER_PASSWORD'),
    };

    try {
      const response = await lastValueFrom(this.httpService.post(url, data));
      await this.cacheManager.set(
        '',
        response.data.token,
        BusyBoxAccessTokenTTL,
      );
      return response.data.token;
    } catch (error) {
      // Handle error appropriately
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
}

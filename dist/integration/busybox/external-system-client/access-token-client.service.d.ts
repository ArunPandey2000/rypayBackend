import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
export declare class AccessTokenClientService {
    private httpService;
    private cacheManager;
    private configService;
    constructor(httpService: HttpService, cacheManager: Cache, configService: ConfigService);
    getToken(): Promise<string>;
    getHeaderConfig(isBearerAuth?: boolean): Promise<{
        headers: {
            Authorization: string;
            Token?: undefined;
        } | {
            Token: string;
            Authorization?: undefined;
        };
    }>;
}

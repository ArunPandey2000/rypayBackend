import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
export declare class SmsClientService {
    private httpService;
    private configService;
    private logger;
    constructor(httpService: HttpService, configService: ConfigService, logger: Logger);
    sendOtpToPhone(phone: string, otp: string): Promise<import("axios").AxiosResponse<any, any>>;
}

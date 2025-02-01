import { Strategy } from 'passport-jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
declare const RefreshTokenStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class RefreshTokenStrategy extends RefreshTokenStrategy_base {
    constructor(configService: ConfigService);
    validate(req: Request, payload: any): any;
}
export {};

import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
type JwtPayload = {
    sub: string;
    username: string;
};
declare const AccessTokenStrategy_base: new (...args: any[]) => InstanceType<typeof Strategy>;
export declare class AccessTokenStrategy extends AccessTokenStrategy_base {
    private configService;
    constructor(configService: ConfigService);
    validate(payload: JwtPayload): JwtPayload;
}
export {};

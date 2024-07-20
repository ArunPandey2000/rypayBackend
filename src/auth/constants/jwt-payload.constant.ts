import { JwtSignOptions } from "@nestjs/jwt";

export const BASE_OPTIONS: JwtSignOptions = {
    issuer: 'rypay-service.com',
    audience:'rypay-client',
}

export const ACCESS_TOKEN_EXPIRY = 4 * 60 * 60 * 1000; // 4h
export const REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30d
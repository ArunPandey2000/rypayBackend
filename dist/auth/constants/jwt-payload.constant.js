"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REFRESH_TOKEN_EXPIRY = exports.ACCESS_TOKEN_EXPIRY = exports.BASE_OPTIONS = void 0;
exports.BASE_OPTIONS = {
    issuer: 'rypay-service.com',
    audience: 'rypay-client',
};
exports.ACCESS_TOKEN_EXPIRY = 4 * 60 * 60;
exports.REFRESH_TOKEN_EXPIRY = 30 * 24 * 60 * 60;
//# sourceMappingURL=jwt-payload.constant.js.map
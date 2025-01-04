"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUtil = void 0;
class AuthUtil {
    static getAccessTokenPayloadFromUserModel(userData) {
        return {
            userId: userData.id,
            phoneNumber: userData.phoneNumber,
            role: userData.role,
        };
    }
}
exports.AuthUtil = AuthUtil;
//# sourceMappingURL=auth.util.js.map
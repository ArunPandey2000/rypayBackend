import { User } from "src/core/entities/user.entity";
import { IAccessTokenUserPayload } from "../interfaces/user-token-request-payload.interface";

export class AuthUtil {
    static getAccessTokenPayloadFromUserModel(userData: User): IAccessTokenUserPayload {
        return {
            userId: userData.id,
            phoneNumber: userData.phoneNumber,
            role: userData.role
        }
    }
}
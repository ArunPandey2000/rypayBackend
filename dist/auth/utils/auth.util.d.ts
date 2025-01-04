import { User } from 'src/core/entities/user.entity';
import { IAccessTokenUserPayload } from '../interfaces/user-token-request-payload.interface';
export declare class AuthUtil {
    static getAccessTokenPayloadFromUserModel(userData: User): IAccessTokenUserPayload;
}

import { User } from 'src/core/entities/user.entity';
import { UserRequestDto } from '../dto/user-request.dto';
export declare class UserMapper {
    static mapUserRequestDtoToEntity(userRequestDto: UserRequestDto): User;
    static mapUserRequestDtoToMerchantRegistrationDto(userRequestDto: UserRequestDto, orgId: string): CardIssuanceDto;
}

import { ApiProperty } from "@nestjs/swagger";
import { UserResponse } from "src/users/dto/user-response.dto";

export class RefreshAccessTokenResponseDto {
    @ApiProperty()
    user: UserResponse;

    @ApiProperty()
    accessToken: string
}
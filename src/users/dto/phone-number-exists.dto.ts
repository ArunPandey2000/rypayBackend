import { ApiProperty } from "@nestjs/swagger";

export class PhoneNumberExists {
    @ApiProperty()
    isUserExist: boolean
}
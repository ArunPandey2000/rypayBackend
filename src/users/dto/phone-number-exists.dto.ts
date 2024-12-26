import { ApiProperty } from "@nestjs/swagger";

export class PhoneNumberExists {
    @ApiProperty()
    isUserExist: boolean
    @ApiProperty()
    userName: string | null
    @ApiProperty()
    phoneNumber: string | null
}
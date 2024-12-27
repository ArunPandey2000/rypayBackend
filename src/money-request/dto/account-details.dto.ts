import { ApiProperty } from "@nestjs/swagger";

export class AccountDetails {
    @ApiProperty()
    accountName: string

    @ApiProperty()
    accountNumber: string

    @ApiProperty()
    IFSC: string;

    @ApiProperty()
    BankName: string
}
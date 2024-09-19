import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Beneficiary } from "src/core/entities/beneficiery.entity";

export class BeneficiaryResponseDto {
    @ApiProperty()
    readonly name: string;
    @ApiProperty()
    readonly ifscCode: string;
    @ApiProperty()
    readonly bankAccountNumber: string;

    constructor(response: Beneficiary) {
        this.name = response.nameInBank;
        this.ifscCode = response.ifscCode;
        this.bankAccountNumber = response.bankAccountNumber;
    }
}

export class MessageResponse {
    @ApiProperty()
    message: string
}
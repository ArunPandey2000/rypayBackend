import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBeneficiaryDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;
    @IsNotEmpty()
    @ApiProperty()
    readonly ifscCode: string;
    @IsNotEmpty()
    @ApiProperty()
    readonly bankAccountNumber: string;
}
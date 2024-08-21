import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length } from "class-validator";

export class CreateKitNumbersDto {
    @IsNotEmpty()
    @ApiProperty()
    kitNumber: string;

    @ApiProperty()
    @IsNotEmpty()
    @Length(4)
    lastFourDigits: string;
}
  
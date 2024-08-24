import { ApiProperty } from "@nestjs/swagger";
import { Length } from "class-validator";

export class PinRequestDto {
    @ApiProperty()
    @Length(4,4)
    pin: string;
}
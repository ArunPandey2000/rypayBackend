import { ApiProperty } from "@nestjs/swagger";

export class StaticQRDTO {
    @ApiProperty()
    url: string
}
import { ApiProperty } from "@nestjs/swagger";

export class CircleResponseDto {
    @ApiProperty()
    state: string;
    
    @ApiProperty()
    circleCode: string;
}
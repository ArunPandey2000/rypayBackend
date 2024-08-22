import { ApiProperty } from "@nestjs/swagger";
import { ICircleCode } from "src/integration/a1topup/external/interfaces/operator-response.interface";

export class CircleResponseDto {
    @ApiProperty()
    state: string;
    
    @ApiProperty()
    circleCode: string;

    constructor(circle: ICircleCode) {
        this.state = circle.name;
        this.circleCode = circle.stateId;
    }
}

export class CircleApiResponseDto {
    @ApiProperty()
    data: CircleResponseDto
}
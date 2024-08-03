import { ApiProperty } from "@nestjs/swagger";
import { ICircleCode } from "src/integration/a1topup/external/interfaces/operator-response.interface";

export class CircleResponseDto {
    @ApiProperty()
    state: string;
    
    @ApiProperty()
    circleCode: string;

    constructor(circle: ICircleCode) {
        this.state = circle.circle_name;
        this.circleCode = circle.circle_name;
    }
}
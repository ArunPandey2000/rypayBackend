import { ICircleCode } from "src/integration/a1topup/external/interfaces/operator-response.interface";
export declare class CircleResponseDto {
    state: string;
    circleCode: string;
    constructor(circle: ICircleCode);
}
export declare class CircleApiResponseDto {
    data: CircleResponseDto;
}

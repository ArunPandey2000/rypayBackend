import { Beneficiary } from "src/core/entities/beneficiery.entity";
export declare class BeneficiaryResponseDto {
    readonly name: string;
    readonly ifscCode: string;
    readonly bankAccountNumber: string;
    constructor(response: Beneficiary);
}
export declare class MessageResponse {
    message: string;
}

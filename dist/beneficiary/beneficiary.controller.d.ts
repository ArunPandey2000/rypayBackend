import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { BeneficiaryResponseDto } from './dto/beneficiary-response.dto';
export declare class BeneficiaryController {
    private readonly beneficiaryService;
    constructor(beneficiaryService: BeneficiaryService);
    create(req: any, createBeneficiaryDto: CreateBeneficiaryDto): Promise<{
        message: string;
    }>;
    findAll(req: any): Promise<BeneficiaryResponseDto[]>;
    update(req: any, accountid: string, updateBeneficiaryDto: UpdateBeneficiaryDto): Promise<{
        message: string;
    }>;
    remove(req: any, accountid: string): Promise<{
        message: string;
    }>;
}

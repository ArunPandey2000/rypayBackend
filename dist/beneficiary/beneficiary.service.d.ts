import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { Beneficiary } from 'src/core/entities/beneficiery.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { BeneficiaryResponseDto } from './dto/beneficiary-response.dto';
export declare class BeneficiaryService {
    private beneficiaryRepo;
    private userRepo;
    constructor(beneficiaryRepo: Repository<Beneficiary>, userRepo: Repository<User>);
    createBeneficiary(userId: string, createBeneficiaryDto: CreateBeneficiaryDto): Promise<{
        message: string;
    }>;
    findAll(userId: string): Promise<BeneficiaryResponseDto[]>;
    update(userId: string, accountNumber: string, updateBeneficiaryDto: UpdateBeneficiaryDto): Promise<{
        message: string;
    }>;
    remove(userId: string, accountNumber: string): Promise<{
        message: string;
    }>;
}

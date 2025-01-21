import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { LoanAdminResponseDto, LoanResponseDto } from './dto/loan.dto';
import { PayloanDto } from './dto/pay-loan.dto';
export declare class LoansController {
    private readonly loansService;
    constructor(loansService: LoansService);
    create(createLoanDto: CreateLoanDto): Promise<LoanAdminResponseDto[]>;
    findAll(): Promise<LoanAdminResponseDto[]>;
    findAllLoansOfUser(req: any): Promise<LoanResponseDto[]>;
    findOne(id: string): Promise<LoanResponseDto>;
    update(id: string, updateLoanDto: UpdateLoanDto): Promise<import("../core/entities/loan.entity").Loan>;
    remove(id: string): Promise<void>;
    PayLoan(req: any, loanPaymentDto: PayloanDto): Promise<{
        referenceId: string;
        amount: number;
        message: string;
    }>;
}

import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { Loan } from 'src/core/entities/loan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { LoanAdminResponseDto, LoanResponseDto } from './dto/loan.dto';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Order } from 'src/core/entities/order.entity';
import { PayloanDto } from './dto/pay-loan.dto';
export declare class LoansService {
    private loanRepo;
    private walletService;
    private orderRepository;
    private userRepo;
    constructor(loanRepo: Repository<Loan>, walletService: WalletService, orderRepository: Repository<Order>, userRepo: Repository<User>);
    createLoan(createLoanDto: CreateLoanDto): Promise<LoanAdminResponseDto[]>;
    private addMonths;
    findAllUserLoans(userId: string): Promise<LoanResponseDto[]>;
    findAllLoans(): Promise<LoanAdminResponseDto[]>;
    findOne(id: number): Promise<LoanResponseDto>;
    updateLoan(id: number, paymentDto: UpdateLoanDto): Promise<Loan>;
    remove(id: number): Promise<void>;
    payLoan(userId: string, loanPaymentDto: PayloanDto): Promise<{
        referenceId: string;
        amount: number;
        message: string;
    }>;
    private handleLoanPayment;
}

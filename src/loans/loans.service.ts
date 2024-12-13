import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/core/entities/loan.entity';
import { Repository } from 'typeorm';
import { LoanStatus } from './enums/loan-status.enum';
import { User } from 'src/core/entities/user.entity';

@Injectable()
export class LoansService {
  constructor(@InjectRepository(Loan) private loanRepo: Repository<Loan>,
  @InjectRepository(User) private userRepo: Repository<User>
) {
    
  }
  async createLoan(createLoanDto: CreateLoanDto) {
    const user = await this.userRepo.findOneBy({id: createLoanDto.userId?.toString()});
    if (!user) {
      throw new NotFoundException(`User with ID ${createLoanDto.userId} not found`);
    }

    const loan = this.loanRepo.create({ ...createLoanDto, user });
    return this.loanRepo.save(loan);
  }

  findAll() {
    return this.loanRepo.find();
  }

  async findOne(id: number) {
    const loan = await this.loanRepo.findOneBy({id});
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return loan;
  }

  async updateLoan(id: number, paymentDto: UpdateLoanDto): Promise<Loan> {
    const { paymentAmount } = paymentDto;

    const loan = await this.loanRepo.findOneBy({id});
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }

    // Update the paid amount
    loan.paidAmount += paymentAmount;

    // Update loan status
    if (loan.paidAmount >= loan.totalAmount) {
      loan.loanStatus = LoanStatus.Paid;
      loan.paidAmount = loan.totalAmount; // Ensure no overpayment is recorded
    } else if (loan.paidAmount > 0) {
      loan.loanStatus = LoanStatus.PartiallyPending;
    }

    return this.loanRepo.save(loan);
  }

  async remove(id: number) {
    const loan = await this.findOne(id);
    await this.loanRepo.remove(loan);
  }
}

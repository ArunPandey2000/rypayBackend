import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loan } from 'src/core/entities/loan.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { LoanAdminResponseDto, LoanResponseDto } from './dto/loan.dto';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Order, OrderStatus, OrderType } from 'src/core/entities/order.entity';
import { generateRef } from 'src/core/utils/hash.util';
import { TransactionStatus } from 'src/core/entities/transactions.entity';
import { PayloanDto } from './dto/pay-loan.dto';
import { LoanStatus } from './enums/loan-status.enum';

@Injectable()
export class LoansService {
  constructor(@InjectRepository(Loan) private loanRepo: Repository<Loan>,
  private walletService: WalletService,
  @InjectRepository(Order) private orderRepository: Repository<Order>,
  @InjectRepository(User) private userRepo: Repository<User>
) {
    
  }
  async createLoan(createLoanDto: CreateLoanDto) {
    let loanResponse: Loan[] = []
    try {
      const user = await this.userRepo.findOneBy({id: createLoanDto.userId});
      if (!user) {
        throw new NotFoundException(`User with ID ${createLoanDto.userId} not found`);
      }

      const { totalAmount, overdueAmount, installmentDate, installmentAmount } = createLoanDto;

      const installmentsCount = Math.ceil(totalAmount / installmentAmount);

      // Generate multiple loans based on the calculated number of installments
      const loans: Loan[] = [];
      let currentOverdueDate = new Date(installmentDate);

      for (let i = 0; i < installmentsCount; i++) {
        const isLastInstallment = i === installmentsCount - 1;
        const loanAmount = isLastInstallment ? totalAmount - (installmentAmount * (installmentsCount - 1)) : installmentAmount;

        const loan = this.loanRepo.create({
          loanAccount: createLoanDto.loanId,
          totalAmount: totalAmount,
          overdueAmount: overdueAmount,
          installmentAmount: loanAmount,
          loanStatus: 'Pending',
          user,
          dueDate: currentOverdueDate,
        });

        // Increment the overdue date by 1 month for each installment
        currentOverdueDate = this.addMonths(currentOverdueDate, 1);

        loans.push(loan);
      }
      loanResponse = await this.loanRepo.save(loans)
    } catch (err) {
      throw err;
    }
    return  loanResponse.map(loan => new LoanAdminResponseDto(loan));
  }

  private addMonths(date, months) {
    const originalDay = date.getDate(); // Original day (e.g., 30)
    const newDate = new Date(date);
  
    const isfeb = (date.getMonth() + 1 + months) % 12 === 2;
    newDate.setMonth(newDate.getMonth() + months);
    if (isfeb && originalDay > 28) {
        const isLeapYear = (newDate.getFullYear() % 4 === 0 && (newDate.getFullYear() % 100 !== 0 || newDate.getFullYear() % 400 === 0));
        newDate.setDate(isLeapYear ? 29 : 28);
        newDate.setMonth(1);
    } else {
      // For all other months, preserve the original day or adjust if it's invalid for the month
      const lastDayOfMonth = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate();
      newDate.setDate(Math.min(originalDay, lastDayOfMonth));
    }
  
    return newDate;
  }
  

  async findAllUserLoans(userId: string) {
    if (!userId) {
      throw new BadRequestException('userId not found');
    }
    const loans = (await this.loanRepo.find({
      where: {
        user: {
          id: userId
        }
      },
      order: {
        dueDate: 'ASC'
      }
    })) ?? [];
    return loans.map(loan => new LoanResponseDto(loan));
  }

  async findAllLoans() {
    const loans =await this.loanRepo.find({});
    return loans.map(loan => new LoanAdminResponseDto(loan));
  }

  async findOne(id: number) {
    const loan = await this.loanRepo.findOneBy({id});
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    return new LoanResponseDto(loan);
  }

  async updateLoan(id: number, paymentDto: UpdateLoanDto): Promise<Loan> {

    const loan = await this.loanRepo.findOneBy({id});
    if (!loan) {
      throw new NotFoundException(`Loan with ID ${id} not found`);
    }
    if (paymentDto.loanStatus) {
      loan.loanStatus = paymentDto.loanStatus
    }
    if(paymentDto.installmentAmount !== undefined) {
      loan.installmentAmount = paymentDto.installmentAmount;
    }
    if(paymentDto.overdueAmount !== undefined) {
      loan.overdueAmount = paymentDto.overdueAmount;
    }

    return this.loanRepo.save(loan);
  }

  async remove(id: number) {
    const loan = await this.loanRepo.findBy({id: id});
    if (!loan) {
      throw new BadRequestException('loan Id not found')
    }
    await this.loanRepo.remove(loan);
  }


  async payLoan(userId: string, loanPaymentDto: PayloanDto) {
          if (!loanPaymentDto.loanId) {
            throw new BadRequestException('loanId is mandatory');
          }
          const loan = await this.loanRepo.findOneBy({
            id: +loanPaymentDto.loanId
          });
          if (!loan) {
            throw new NotFoundException('Loan not found against this loan Id');
          }
          const user = await this.userRepo.findOne({where: {id: userId}}); 
          if (!user || loan.user.id !== userId) {
            throw new ForbiddenException('User not found');
          }

          const wallet = await this.walletService.getWallet({user: {id: userId}});
          if (wallet.balance < loanPaymentDto.amount) {
              throw new BadRequestException('Insufficient Balance')
          }
          const description = loanPaymentDto.remarks ? loanPaymentDto.remarks : `Loan Payment ${loan.loanAccount}`
          const orderId = generateRef(12);
          const order = {
              order_id: orderId,
              order_type: OrderType.PAYMENT,
              gateway_response: '',
              amount: loanPaymentDto.amount,
              status: OrderStatus.SUCCESS,
              transaction_id: loan.loanAccount,
              user: user,
              description: description,
              payment_method: 'WALLET',
              respectiveUserName: "",
              ifscNumber: null,
              accountId: loan.loanAccount
          }
          const SavedOrder = this.orderRepository.create(order);
          this.orderRepository.save(SavedOrder);
  
          await this.walletService.processRechargePayment({amount: loanPaymentDto.amount,
               receiverId: loan.loanAccount,
               serviceUsed: 'LoanPayment',
               description: description,
               status: TransactionStatus.SUCCESS,
               reference: orderId }, userId);
          await this.handleLoanPayment(loan, loanPaymentDto);
          
          return {
              referenceId: SavedOrder.order_id,
              amount: loanPaymentDto.amount,
              message: description
          }
      }
  
  private async handleLoanPayment(loan: Loan, loanPaymentDto: PayloanDto) {
    const installmentAmount = +loan.installmentAmount,
      overdueAmount = +loan.overdueAmount;
    const totalAmount = installmentAmount + overdueAmount;
    const newStatus = loanPaymentDto.amount >= totalAmount ? LoanStatus.Paid : LoanStatus.PartiallyPending;
      const isExtraAmountThenInstallment = loanPaymentDto.amount > installmentAmount;
      let newInstallmentAmount = installmentAmount - loanPaymentDto.amount;
      let newOverdueAmount = overdueAmount;
      if (loanPaymentDto.amount > totalAmount) {
        throw new BadRequestException('Loan Payment amount is greater than loan amount');
      }
      if (loan.loanStatus === LoanStatus.Paid){
        throw new BadRequestException('Loan Payment already done');
      }
      if (isExtraAmountThenInstallment) {
        loan.installmentAmount = 0;
        const extraAmount = loanPaymentDto.amount - installmentAmount;
        newOverdueAmount = overdueAmount - extraAmount;
      }
      await this.loanRepo.update({id: +loanPaymentDto.loanId}, {
        loanStatus: newStatus,
        installmentAmount: newInstallmentAmount,
        overdueAmount: newOverdueAmount
      })
  }
}

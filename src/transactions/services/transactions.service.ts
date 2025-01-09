import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/core/entities/transactions.entity';
import { Between, In, Like, QueryRunner, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionQueryDto } from '../dto/get-transactions.dto';
import { PaginatedResponseDto, Pagination } from '../dto/pagination-response.dto';
import { PdfService } from 'src/pdf/services/pdf.service';
import { formatAmountToINR, formatDateToIST } from 'src/core/utils/date.util';
import { User } from 'src/core/entities/user.entity';
import { TransactionResponseDto, UserTransactionDto } from '../dto/transaction-response.dto';
import { AccountDetails, TransactionDetailDto } from '../dto/transaction-detail.dto';
import { Order } from 'src/core/entities/order.entity';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private pdfService: PdfService
    ){ }

    async saveTransaction(
        createTransactionDto: CreateTransactionDto,
        queryRunner: QueryRunner,
      ): Promise<Transaction> {
        const transactions =
          this.transactionsRepository.create(createTransactionDto);
    
        if (!transactions) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new BadRequestException('Transaction cannot be created');
        }
    
        await queryRunner.manager.save(transactions);
    
        return transactions;
      }

  async getWalletTransactions(req: any, queryDto: TransactionQueryDto) {
    const userId = req.user.sub;
    const { page = 1, pageSize = 10 } = queryDto.pagination || {};
    const skipRecords = pageSize * (page - 1);

    const { search, transactionType, fromDate, toDate, sortDirection } = queryDto;

    // Build the base query
    const baseWhere: any = {
      user: { id: userId },
      ...(transactionType && { type: transactionType }),
      ...(fromDate && toDate && { transactionDate: Between(new Date(fromDate), new Date(toDate)) }),
    };

    // Add search condition with `OR` logic
    let searchConditions = [];
    if (search) {
      searchConditions = [
        { transactionHash: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
        { reference: Like(`%${search}%`) },
      ];
    }

    // Combine baseWhere with searchConditions
    const where = search ? [baseWhere, ...searchConditions] : baseWhere;

    // Fetch paginated transactions
    const transactions = await this.transactionsRepository.find({
      where: where,
      order: { createdAt: sortDirection },
      take: pageSize,
      skip: skipRecords,
    });

    // Count the total number of transactions for pagination
    const total = await this.transactionsRepository.count({ where: where });

    // Fetch user data for wallet transactions
    const walletTransactionUserIds = Array.from(new Set(transactions.map((transaction) => this.getRelevantUserId(transaction))));

    const userData = await this.userRepo.find({
      where: { id: In(walletTransactionUserIds) },
    });

    // Map the transactions to TransactionResponseDto
    const result = transactions.map((transaction): TransactionResponseDto => {
      const counterPartyUser = this.getCounterpartyUser(transaction, userData);

      return {
        id: transaction.id,
        amount: transaction.amount,
        walletBalanceBefore: transaction.walletBalanceBefore,
        walletBalanceAfter: transaction.walletBalanceAfter,
        sender: transaction.sender,
        receiver: transaction.receiver,
        reference: transaction.reference,
        description: transaction.description,
        transactionHash: transaction.transactionHash,
        transactionType: transaction.type,
        transactionDate: transaction.transactionDate,
        createdAt: transaction.createdAt,
        serviceUsed: transaction.serviceUsed,
        updatedAt: transaction.updatedAt,
        counterPartyUser,
      };
    });

    // Return the paginated response using your custom Pagination class
    return new Pagination().PaginateResponse(result, total, page, pageSize);
  }

  async getTransactionDetail(transactionId: string | undefined) {
    if (!transactionId || Number.isNaN(Number.parseInt(transactionId))) {
      throw new BadRequestException('TransactionId is mandatory')
    }
    const transaction = await this.transactionsRepository.findOneBy({
      id: Number.parseInt(transactionId)
    })
    if (!transaction) {
      throw new NotFoundException('transaction not found')
    }
    const senderUser = transaction.sender ? await this.userRepo.findOneBy({
      id: transaction.sender
    }): null;
    const receiverUser = transaction.receiver && transaction.serviceUsed === "WALLET" ? await this.userRepo.findOneBy({
      id: transaction.receiver
    }): null;

    const order = await this.orderRepo.findOne({where: {order_id: transaction.reference}});
    const accountDetails: AccountDetails = order ? {
      accountNumber: order.accountId,
      ifscNumber: order.ifscNumber,
      userName: order.respectiveUserName
    }: null
    return new TransactionDetailDto(transaction, senderUser, receiverUser, accountDetails);
  }
  async getAllWalletTransactions(queryDto: TransactionQueryDto) {
    const { page = 1, pageSize = 10 } = queryDto.pagination || {};
    const skipRecords = pageSize * (page - 1);

    const { search, transactionType, fromDate, toDate, sortDirection } = queryDto;

    // Build the base query
    const baseWhere: any = {
      ...(transactionType && { type: transactionType }),
      ...(fromDate && toDate && { transactionDate: Between(new Date(fromDate), new Date(toDate)) }),
    };

    // Add search condition with `OR` logic
    let searchConditions = [];
    if (search) {
      searchConditions = [
        { transactionHash: Like(`%${search}%`) },
        { description: Like(`%${search}%`) },
        { reference: Like(`%${search}%`) },
      ];
    }

    // Combine baseWhere with searchConditions
    const where = search ? [baseWhere, ...searchConditions] : baseWhere;

    // Fetch paginated transactions
    const transactions = await this.transactionsRepository.find({
      where: where,
      order: { createdAt: sortDirection },
      take: pageSize,
      skip: skipRecords,
    });

    // Count the total number of transactions for pagination
    const total = await this.transactionsRepository.count({ where: where });

    // Fetch user data for wallet transactions
    const walletTransactionUserIds = Array.from(new Set(transactions.map((transaction) => this.getRelevantUserId(transaction))));

    const userData = await this.userRepo.find({
      where: { id: In(walletTransactionUserIds) },
    });

    // Map the transactions to TransactionResponseDto
    const result = transactions.map((transaction): TransactionResponseDto => {
      const counterPartyUser = this.getCounterpartyUser(transaction, userData);

      return {
        id: transaction.id,
        amount: transaction.amount,
        walletBalanceBefore: transaction.walletBalanceBefore,
        walletBalanceAfter: transaction.walletBalanceAfter,
        sender: transaction.sender,
        receiver: transaction.receiver,
        reference: transaction.reference,
        description: transaction.description,
        transactionHash: transaction.transactionHash,
        transactionType: transaction.type,
        transactionDate: transaction.transactionDate,
        createdAt: transaction.createdAt,
        serviceUsed: transaction.serviceUsed,
        updatedAt: transaction.updatedAt,
        counterPartyUser,
      };
    });

    // Return the paginated response using your custom Pagination class
    return new Pagination().PaginateResponse(result, total, page, pageSize);
  }

  private getRelevantUserId(transaction: Transaction): string | null {
    if (transaction.serviceUsed === "WALLET") {
        // Determine the relevant user based on the transaction type
      if (transaction.type === "CREDIT") { // Credit
        return transaction.sender || transaction.receiver;
      } else { // Debit
        return transaction.receiver || transaction.sender;
      }
    }
    return null
  }

  private getCounterpartyUser(transaction: any, userData: User[]): UserTransactionDto | null {
    const userId = this.getRelevantUserId(transaction);
    if (!userId) {
      return null
    }
    const user = userData.find((user) => user.id.toString() === userId);

    return user ? {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    } : null;
  }

    

  async getPrintableTransactionRecords(req: any, queryDto: TransactionQueryDto) {
    if (!queryDto.pagination) {
      queryDto.pagination = {
        page: 1,
        pageSize: Number.MAX_SAFE_INTEGER
      }
    }
    const result = await this.getWalletTransactions(req, queryDto);
    const transaction = await this.transactionsRepository.findOne({
      where: {
        user: {
          id: req.user.sub
        },
      },
      relations: ['user', 'user.address']
    });
    const user = transaction?.user;
    const pdfPayload =  {
      dateRange: {
        to: formatDateToIST(new Date(queryDto.toDate), false),
        from: formatDateToIST(new Date(queryDto.fromDate), false)
      },
      generatedDate: formatDateToIST(new Date()),
      user: {
        name: `${user.firstName} ${user.lastName}`,
        cardNumber: '*********1234',
        panNumber: user.panNumber,
        accountNumber: '4658511009',
        ifscCode: 'YESB0000136',
        address: `${user.address.address1} ${user.address.address2} ${user.address.city} ${user.address.state} ${user.address.pincode}`
      },
      statement: result.data.map((record) => ({
        date: formatDateToIST(record.transactionDate),
        description: record.description,
        reference: record.reference,
        amount: formatAmountToINR(record.amount),
        transactionType: record.transactionType,
        transactionHash: record.transactionHash,
        balance: formatAmountToINR(record.walletBalanceAfter)
      }))
    }
    return this.pdfService.generatePDF(pdfPayload);
  }
}

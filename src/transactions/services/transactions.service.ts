import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from 'src/core/entities/transactions.entity';
import { Between, Like, QueryRunner, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionQueryDto } from '../dto/get-transactions.dto';
import { Pagination } from '../dto/pagination-response.dto';
import { PdfService } from 'src/pdf/services/pdf.service';
import { formatDateToIST } from 'src/core/utils/date.util';

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
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
    
        const pagination = new Pagination();
        const page = Math.floor(queryDto.pagination?.page) || 1;
        const pageSize = Math.floor(queryDto.pagination?.pageSize) || 10;
        const skipRecords = pageSize * (page - 1);

        const { search , transactionType, toDate, fromDate, sortDirection} = queryDto;
    
    
        let result;
        let total = 0;
    
        if (search) {
          const query = await this.transactionsRepository.find({
            where: {
              user: { id: userId },
              transactionHash: Like(`%${search}%`),
              type: transactionType,
              ...(queryDto.fromDate &&
                queryDto.toDate && {
                  transactionDate: Between(new Date(fromDate), new Date(toDate)),
                }),
            },
            order: { createdAt: sortDirection },
            take: pageSize,
            skip: skipRecords,
          });
    
          result = query.map((transaction) => ({
            id: transaction.id,
            amount: transaction.amount,
            sender: transaction.sender,
            receiver: transaction.receiver,
            reference: transaction.reference,
            description: transaction.description,
            transactionHash: transaction.transactionHash,
            transactionType: transaction.type,
            transactionDate: transaction.transactionDate,
            createdAt: transaction.createdAt,
            updatedAt: transaction.updatedAt
          }));
    
          total = await this.transactionsRepository.count({
            where: {
              user: { id: userId },
              transactionHash: Like(`%${search}%`),
              type: transactionType,
              ...(fromDate &&
                toDate && {
                  transactionDate: Between(new Date(fromDate), new Date(toDate)),
                }),
            },
          });
        } else {
          const query = await this.transactionsRepository.find({
            where: {
              user: { id: userId },
              type: transactionType,
              ...(fromDate &&
                toDate && {
                  transactionDate: Between(new Date(fromDate), new Date(toDate)),
                }),
            },
            order: { createdAt: sortDirection },
            take: pageSize,
            skip: skipRecords,
          });
    
          result = query.map((transaction) => ({
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
            updatedAt: transaction.updatedAt,
          }));
    
          total = await this.transactionsRepository.count({
            where: { user: { id: userId }, type: transactionType },
          });
        }
    
        return pagination.PaginateResponse(result, total, page, pageSize);
      }

      async getPrintableTransactionRecords(req: any, queryDto: TransactionQueryDto) {
        const result = await this.getWalletTransactions(req, queryDto);
        const transaction = await this.transactionsRepository.findOne({
          where: {
            user: {
              id: req.user.sub
            }
          }
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
            virtualAccountNumber: user.cardHolderId,
            panNumber: user.panNumber,
            category: user.role,
            email: user.email,
            phone: user.phoneNumber
          },
          statement: result.data.map((record) => ({
            date: formatDateToIST(record.transactionDate),
            description: record.description,
            reference: record.reference,
            amount: record.amount,
            transactionType: record.transactionType,
            transactionHash: record.transactionHash,
            balance: record.walletBalanceAfter
          }))
        }
        return this.pdfService.generatePDF(pdfPayload);
      }
}

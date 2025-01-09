import { Transaction } from 'src/core/entities/transactions.entity';
import { QueryRunner, Repository } from 'typeorm';
import { CreateTransactionDto } from '../dto/create-transaction.dto';
import { TransactionQueryDto } from '../dto/get-transactions.dto';
import { PdfService } from 'src/pdf/services/pdf.service';
import { User } from 'src/core/entities/user.entity';
import { TransactionDetailDto } from '../dto/transaction-detail.dto';
import { Order } from 'src/core/entities/order.entity';
export declare class TransactionsService {
    private readonly transactionsRepository;
    private readonly orderRepo;
    private readonly userRepo;
    private pdfService;
    constructor(transactionsRepository: Repository<Transaction>, orderRepo: Repository<Order>, userRepo: Repository<User>, pdfService: PdfService);
    saveTransaction(createTransactionDto: CreateTransactionDto, queryRunner: QueryRunner): Promise<Transaction>;
    getWalletTransactions(req: any, queryDto: TransactionQueryDto): Promise<{
        data: any[];
        pagination: {
            page: number;
            pageSize: number;
            totalRecords: number;
            pageCount: number;
            hasPreviousPage: boolean;
            hasNextPage: boolean;
        };
    }>;
    getTransactionDetail(transactionId: string | undefined): Promise<TransactionDetailDto>;
    getAllWalletTransactions(queryDto: TransactionQueryDto): Promise<{
        data: any[];
        pagination: {
            page: number;
            pageSize: number;
            totalRecords: number;
            pageCount: number;
            hasPreviousPage: boolean;
            hasNextPage: boolean;
        };
    }>;
    private getRelevantUserId;
    private getCounterpartyUser;
    getPrintableTransactionRecords(req: any, queryDto: TransactionQueryDto): Promise<Buffer>;
}

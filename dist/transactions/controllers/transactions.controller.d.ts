import { Transaction } from 'typeorm';
import { PrintableTransactionQueryDto, TransactionQueryDto } from '../dto/get-transactions.dto';
import { TransactionsService } from '../services/transactions.service';
import { Request, Response } from 'express';
import { Queue } from 'bull';
export declare class TransactionsController {
    private transactionService;
    private reportQueue;
    constructor(transactionService: TransactionsService, reportQueue: Queue);
    GetWalletTransactions(req: Request, transcationQuery: TransactionQueryDto): Promise<Transaction[] | any>;
    GetTransactionDetail(transactionId: string): Promise<Transaction | any>;
    GetAllWalletTransactions(transcationQuery: TransactionQueryDto): Promise<Transaction[] | any>;
    generatePDF(req: any, data: PrintableTransactionQueryDto, res: Response): Promise<void>;
}

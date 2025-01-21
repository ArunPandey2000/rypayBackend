import { Job } from 'bull';
import { TransactionsService } from '../services/transactions.service';
export declare class TransactionProcessor {
    private readonly transactionService;
    constructor(transactionService: TransactionsService);
    handleGenerate(job: Job): Promise<Buffer>;
}

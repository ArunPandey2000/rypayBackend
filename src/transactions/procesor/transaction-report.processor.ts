import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { TransactionsService } from '../services/transactions.service';

@Processor('transaction-report')
export class TransactionProcessor {
  constructor(private readonly transactionService: TransactionsService) {}

  @Process('generate')
  async handleGenerate(job: Job) {
    const data = job.data;
    const pdfBuffer = await this.transactionService.getPrintableTransactionRecords(data, data.payload);
    return pdfBuffer;
  }
}
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'typeorm';
import { TransactionQueryDto } from '../dto/get-transactions.dto';
import { TransactionsService } from '../services/transactions.service';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Controller('transactions')
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {

    constructor(private transactionService: TransactionsService,
      @InjectQueue('transaction-report') private reportQueue: Queue
    ) {

    }
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async GetWalletTransactions(
    @Req() req: Request,
    @Body() transcationQuery: TransactionQueryDto
  ): Promise<Transaction[] | any> {
    const result = await this.transactionService.getWalletTransactions(req, transcationQuery);
    return result;
  }

  @Post('generate')
  async generatePDF(@Req() req: any, @Body() data: TransactionQueryDto, @Res() res: Response): Promise<void> {
    const queuePayload = {
      payload: data,
      user: req.user
    }
    const job = await this.reportQueue.add('generate', queuePayload);
    const jobData = (await job.finished()).data;
    const pdfBuffer = Buffer.from(jobData);
    const date = new Date();
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=${req.user.phone}-${date.getTime()}.pdf`,
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}

import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Transaction } from 'typeorm';
import { TransactionQueryDto } from '../dto/get-transactions.dto';
import { TransactionsService } from '../services/transactions.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('transactions')
@ApiBearerAuth()
@ApiTags('Transactions')
@Controller('transactions')
@UseGuards(JwtAuthGuard)
export class TransactionsController {

    constructor(private transactionService: TransactionsService) {

    }
  @Post('/')
  @HttpCode(HttpStatus.OK)
  async GetWalletTransactions(
    @Req() req: Request,
    @Body() transcationQuery: TransactionQueryDto
  ): Promise<Transaction[] | any> {
    const result = await this.transactionService.getWalletTransactions(req, transcationQuery
    );
    return result;
  }
}

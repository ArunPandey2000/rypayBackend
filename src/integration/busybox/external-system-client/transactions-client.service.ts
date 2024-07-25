import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  TransactionDto,
  TransactionResponse,
} from '../external/interfaces/transaction.interface';
import { AccessTokenClientService } from './access-token-client.service';
import { AxiosResponse } from 'axios';

@Injectable()
export class TransactionsClientService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private accessTokenService: AccessTokenClientService,
  ) {}

  /**
   * Performs a debit transaction to set or update the savings account details and balance at the bank.
   * This API allows Set debit savings account and update the balance at bank SOR for the particular savings account.
   * @param {DebitTransactionDto} data - The data required for the debit transaction, including reference number, mobile number, amount, and remark.
   * @returns {Promise<TransactionResponse>} - The response from the external API, containing the status and transaction details.
   * @throws {Error} - Throws an error if the request fails.
   */
  async debitTransaction(data: TransactionDto): Promise<TransactionResponse> {
    const config = await this.accessTokenService.getHeaderConfig();

    try {
      const response = await firstValueFrom(
        this.httpService.post<TransactionResponse>(
          `${this.configService.get('BUSY_BOX_API_BASE_URL')}/transaction/debit`,
          data,
          config,
        ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Performs a credit transaction by sending a POST request to the external API with the provided data.
   * This API allows Set credit savings account and update the balance at bank SOR for the particular savings account.
   * @param {TransactionDto} data - The data required for the credit transaction, including reference number, mobile number, amount, and remark.
   * @returns {Promise<TransactionResponse>} - The response from the external API, containing the status and transaction details.
   * @throws {Error} - Throws an error if the request fails.
   */
  async creditTransaction(data: TransactionDto): Promise<TransactionResponse> {
    const config = await this.accessTokenService.getHeaderConfig();
    try {
      const response: AxiosResponse<TransactionResponse> = await firstValueFrom(
        this.httpService.post<TransactionResponse>(
          `${this.configService.get('BUSY_BOX_API_BASE_URL')}/transaction/credit`,
          data,
          config,
        ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { TransactionDto, TransactionResponse } from '../external/interfaces/transaction.interface';
import { AccessTokenClientService } from './access-token-client.service';
export declare class TransactionsClientService {
    private readonly httpService;
    private configService;
    private accessTokenService;
    constructor(httpService: HttpService, configService: ConfigService, accessTokenService: AccessTokenClientService);
    debitTransaction(data: TransactionDto): Promise<TransactionResponse>;
    creditTransaction(data: TransactionDto): Promise<TransactionResponse>;
}

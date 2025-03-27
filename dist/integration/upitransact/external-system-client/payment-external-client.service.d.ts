import { MergedDataResponseDTO, TransactionHistoryDTO } from "../external/dto/settlement-history.dto";
import { HttpService } from "@nestjs/axios";
export declare class PaymentExternalClientService {
    private readonly httpService;
    private transactionApiUrl;
    private settlementApiUrl;
    private authHeader;
    constructor(httpService: HttpService);
    private getPayloadBody;
    private generateAuthHeader;
    getMergedData(startDate: string, endDate: string, merchantId?: string): Promise<MergedDataResponseDTO>;
    getTransactionsData(startDate: string, endDate: string, merchantId?: string): Promise<TransactionHistoryDTO[]>;
    private handleHttpError;
}

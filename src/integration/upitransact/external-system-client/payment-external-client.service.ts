import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { MergedDataResponseDTO, SettlementHistoryDTO } from "../external/dto/settlement-history.dto";
import * as moment from "moment-timezone";
import { HttpService } from "@nestjs/axios";
import { catchError, firstValueFrom } from "rxjs";
@Injectable()
export class PaymentExternalClientService {

  private transactionApiUrl = ' https://api.upitranzact.com/v1/reseller/fetchTransactions';
  private settlementApiUrl = 'https://api.upitranzact.com/v1/reseller/fetchSettlements';
  private authHeader = '';

  constructor(private readonly httpService: HttpService) {
    const publicKey = process.env.RESELLER_PUBLIC_KEY;
    const privateKey = process.env.RESELLER_PRIVATE_KEY;
    this.authHeader = this.generateAuthHeader(publicKey, privateKey);
  }

  private getPayloadBody(merchantId: string, startDate: string, endDate: string) {
    return {
        rid: process.env.RESELLER_ID,
        mid: merchantId, 
        s_date: startDate,   // Example: 11-03-2025
        e_date: endDate,   // Example: 11-03-2025
    }
  }

  private generateAuthHeader(publicKey: string, privateKey: string): string {
    const credentials = `${publicKey}:${privateKey}`;
    const base64Credentials = Buffer.from(credentials).toString('base64');
    return `Basic ${base64Credentials}`;
  }
  async getMergedData(startDate: string, endDate: string, merchantId?: string): Promise<MergedDataResponseDTO> {
    try {
      // Get today's date in IST (Indian Standard Time)
      const todayIST = moment().tz('Asia/Kolkata').format('DD-MM-YYYY');

      // Fetch transactions & settlements in parallel, handling 404s gracefully

      const transactionRequest = this.httpService.post(this.transactionApiUrl, this.getPayloadBody(
        merchantId, todayIST, todayIST
      ), {
        headers: { Authorization: this.authHeader, 'Content-Type': 'application/json' }
      }).pipe(
        catchError((error) => this.handleHttpError(error, 'transactions'))
      );

      const settlementRequest = this.httpService.post(this.settlementApiUrl,
        this.getPayloadBody(merchantId, startDate, endDate),
        {
            headers: { Authorization: this.authHeader, 'Content-Type': 'application/json' }
        }
       ).pipe(
        catchError((error) => this.handleHttpError(error, 'settlements'))
      );

      const [transactionResponse, settlementResponse] = await Promise.all([
        firstValueFrom(transactionRequest).catch(() => ({ data: { data: [] } })), // Ensure we get an object
        firstValueFrom(settlementRequest).catch(() => ({ data: { data: [] } }))
      ]);

      const transactions = transactionResponse?.data?.data || [];
      const settlements = settlementResponse?.data?.data || [];

      // Calculate today's total collection from transactions
      const todayTotalCollection = transactions.reduce((sum, t) => sum + t.amount, 0);

      // Convert settlements to an array of DTOs
      const settlementHistory: SettlementHistoryDTO[] = settlements.map((settlement) => ({
        date: settlement.created_at.split('T')[0], // Extract date part
        totalAmountSettled: parseFloat(settlement.amount),
        status: settlement.status,
        bankReferenceNumber: settlement.bankReferenceNumber,
        UTR: settlement.UTR,
      }));

      return {
        todayTotalCollection,
        todayTotalSettlementForTomorrow: todayTotalCollection,
        settlementHistory,
      };
    } catch (error) {
      throw new Error(`Failed to fetch merged data: ${error.message}`);
    }
  }

  private handleHttpError(error: any, source: string) {
    if (error.response && error.response.status === 404) {
      console.warn(`[Warning] ${source} API returned 404, treating as empty data.`);
      return [];
    }
    throw new HttpException(
      `Failed to fetch ${source}: ${error.message}`,
      error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
     
}
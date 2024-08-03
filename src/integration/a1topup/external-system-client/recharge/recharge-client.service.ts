import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import { firstValueFrom } from 'rxjs';
import { FetchBillRequestPayload } from '../../external/interfaces/fetch-bill-request.interface';
import { IFetchBillResponse } from '../../external/interfaces/fetch-bill-response.interface';
import { IMobileProviderResponse } from '../../external/interfaces/mobile-provider-info.interface';
import { ICircleCode, IClientApiGenericResponse, IOperatorInfo } from '../../external/interfaces/operator-response.interface';
import { IRechargePlanApiResponse } from '../../external/interfaces/recharge-plans-api-response.interface';
import { IRechargeRequest } from '../../external/interfaces/recharge-request-body.interface';
import { IRechargeResponse } from '../../external/interfaces/recharge-response.interface';
import { TransactionStatusResponse } from '../../external/interfaces/transaction-status-response.interface';
import { IUtilityBillPaymentRequest } from '../../external/interfaces/utility-bill-payment-request.interface';
import { UtilityBillAPIResponse } from '../../external/interfaces/utility-bill-response.interface';

@Injectable()
export class RechargeClientService {
  private readonly apiBaseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    @InjectPinoLogger(RechargeClientService.name) private logger: Logger,
    private readonly configService: ConfigService,
  ) {
    this.apiBaseUrl = this.configService.get<string>('RECHARGE_API_BASE_URL');
  }

  /***
   * this method will recharge prepaid and dth operators
   */
  async initPrepaidOrDTHRecharge(rechargePayload: IRechargeRequest): Promise<IRechargeResponse> {

    const params = {
      api_key: this.getApiKey(),
      ...rechargePayload,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/recharge.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Recharge API error:', error);
      throw error;
    }
  }

  /***
   * this method will pay bills for home utilities
   * electricity
   * water
   * gas 
   */
  async initUtilityPayment(utilityPayload: IUtilityBillPaymentRequest): Promise<UtilityBillAPIResponse> {

    const params = {
      api_key: this.getApiKey(),
      ...utilityPayload,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/bills/payments_v2_2.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Bill payment API error:', error);
      throw error;
    }
  }

  async getTransactionStatus(orderid: string): Promise<IClientApiGenericResponse<TransactionStatusResponse>> {

    const params = {
      api_key: this.getApiKey(),
      order_id: orderid,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/status.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Transaction Status API error:', error);
      throw error;
    }
  }

  async getServiceProvidersList(): Promise<IClientApiGenericResponse<IOperatorInfo[]>> {
    const params = {
      api_key: this.getApiKey()
    }
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/operator_codes.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Service provider list error:', error);
      throw error;
    }
  }

  async getMobileProviderInfo(mobile: string): Promise<IMobileProviderResponse> {
    const params = {
      api_key: this.getApiKey(),
      number: mobile
    }
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/operator_fetch.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('get mobile provider info error:', error);
      throw error;
    }
  }

  async fetchBill(billPayload: FetchBillRequestPayload): Promise<IFetchBillResponse> {
    const params = {
      api_key: this.getApiKey(),
      ...billPayload
    }
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/validation_v2_2.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('get bill details error:', error);
      throw error;
    }
  }

  async getCircleCodeList(): Promise<IClientApiGenericResponse<ICircleCode[]>> {
    const params = {
      api_key: this.getApiKey()
    }
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/circle_codes.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Service provider list error:', error);
      throw error;
    }
  }

  async getRechargePlansList(operatorId: string, stateCode: string): Promise<IRechargePlanApiResponse> {
    const params = {
      api_key: this.getApiKey(),
      opid: operatorId,
      state_code: stateCode
    }
    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/recharge_plans.php`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Recharge plans API error:', error);
      throw error;
    }
  }

  async getCurrentBalance(): Promise<string> {
    const username = this.configService.get<string>('RECHARGE_API_USERNAME');
    const password = this.configService.get<string>('RECHARGE_API_PASSWORD');

    const params = {
      username,
      pwd: password,
      format: 'json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/balance`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Recharge Status API error:', error);
      throw error;
    }
  }

  private getApiKey() {
    return this.configService.get('RECHARGE_API_SECRET_KEY');
  }
}

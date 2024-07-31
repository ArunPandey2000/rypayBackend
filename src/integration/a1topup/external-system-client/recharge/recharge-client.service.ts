import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { IRechargeRequest } from '../../external/interfaces/recharge-request-body.interface';
import { InjectPinoLogger, Logger } from 'nestjs-pino';
import { RechargeResponseDto } from '../../external/interfaces/recharge-response.interface';

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

  async makeRecharge(rechargePayload: IRechargeRequest): Promise<RechargeResponseDto> {
    const username = this.configService.get<string>('RECHARGE_API_USERNAME');
    const password = this.configService.get<string>('RECHARGE_API_PASSWORD');

    const params = {
      username,
      pwd: password,
      ...rechargePayload,
      format: 'json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/api`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Recharge API error:', error);
      throw error;
    }
  }

  async getRechargeStatus(orderid: string): Promise<RechargeResponseDto> {
    const username = this.configService.get<string>('RECHARGE_API_USERNAME');
    const password = this.configService.get<string>('RECHARGE_API_PASSWORD');

    const params = {
      username,
      orderid,
      pwd: password,
      format: 'json',
    };

    try {
      const response = await firstValueFrom(
        this.httpService.get(`${this.apiBaseUrl}/status`, { params })
      );
      return response.data;
    } catch (error) {
      this.logger.error('Recharge Status API error:', error);
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
}

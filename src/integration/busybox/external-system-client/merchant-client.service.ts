import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';
import { AccessTokenClientService } from './access-token-client.service';
import { CardIssuanceResponse } from '../external/interfaces/card-issuence-response.interface';
import { CustomerStatusResponse } from '../external/interfaces/customer-status.interface';

@Injectable()
export class MerchantClientService {
    constructor(private readonly httpService: HttpService,
         private configService: ConfigService,
         private accessTokenService: AccessTokenClientService
        ) {}

  
  /**
   * This API is used to initiate the creation of a MIN KYC wallet using Mobile OTP.
   * If the request is successful, please complete the wallet creation using the Wallet Creation API.
   * @param data: CardIssuenceDto
   * @returns 
   */
  async issueCard(data: CardIssuanceDto): Promise<AxiosResponse<CardIssuanceResponse>> {
    const config = await this.accessTokenService.getHeaderConfig();

    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/issuence`, data, config)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Verifies the OTP by sending a POST request to the external API with the provided data.
   * This API allows for the verification of user registration via an OTP sent to the specified mobile.
   *  The mobile number will be the same as the one passed during the time of creating the wallet.
   *  If the OTP is valid, Busybox will create a wallet and assign a virtual card automatically.
   * The platform can use the Fetch Card Details API to get the card number and Fetch CVV API for get the card CVV.
   * Note: In case the OTP is not delivered, 111111 can be used as the default ONLY while testing this API on the Staging environment.
   * @param {OtpVerificationDto} data - The data required for OTP verification, including mobile number, session ID, and OTP.
   * @returns {Promise<OtpVerificationResponse>} - The response from the external API, containing the status and verification details.
   * @throws {Error} - Throws an error if the request fails.
   */
  async verifyRegistrationOtp(data: OtpVerificationDto): Promise<OtpVerificationResponse> {
    const config = await this.accessTokenService.getHeaderConfig();

    try {
      const response = await firstValueFrom(
        this.httpService.post<OtpVerificationResponse>(`${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/verify`, data, config)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }


  /**
   * Gets the customer status by sending a GET request to the external API with the provided mobile number.
   * 
   * @param {string} mobileNumber - The mobile number of the customer.
   * @returns {Promise<CustomerStatusResponse>} - The response from the external API, containing the customer status and details.
   * @throws {Error} - Throws an error if the request fails.
   */
  async getCustomerStatus(mobileNumber: string): Promise<CustomerStatusResponse> {
    const config = await this.accessTokenService.getHeaderConfig();
    try {
      const response = await firstValueFrom(
        this.httpService.get<CustomerStatusResponse>(`${this.configService.get('BUSY_BOX_API_BASE_URL')}/${mobileNumber}`, config)
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }


}

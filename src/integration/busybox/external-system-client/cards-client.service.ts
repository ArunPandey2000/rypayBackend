import { Injectable } from '@nestjs/common';
import {
  CardAssignmentDto,
  CardAssignmentResponse,
} from '../external/interfaces/card-assignment.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AccessTokenClientService } from './access-token-client.service';
import { firstValueFrom } from 'rxjs';
import {
  CardLockDto,
  CardLockResponse,
} from '../external/interfaces/lock-unlock.interface';
import { CardStatusResponse } from '../external/interfaces/card-status.interface';

@Injectable()
export class CardsClientService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
    private accessTokenService: AccessTokenClientService,
  ) {}
  /**
   * Assigns a card by sending a POST request to the external API with the provided data.
   * This API allows to request a physical card corresponding to a virtual card linked to the wallet associated with the specified mobile. This is applicable only for cards issued with Yes Bank and not for NSDL Payment Bank cards.
   * After successfully requesting for a physical card, use the Fetch details API to fetch the details of the card.
   * The platform can choose the pass the address of the customer and the card will be shipped. Alternatively, the platform can skip the address fields and the cards will be shipped by Busybox to the registered address.
   * Please note that for Yes Bank cards, either activate the virtual or physical card directly using the Activate Insta Card API or you can activate a virtual or physical card independent or each other.
   * @param {CardAssignmentDto} data - The data required for card assignment, including organization ID, mobile number, and kit number.
   * @returns {Promise<CardAssignmentResponse>} - The response from the external API, containing the status and card details.
   * @throws {Error} - Throws an error if the request fails.
   */
  async assignCard(data: CardAssignmentDto): Promise<CardAssignmentResponse> {
    const config = await this.accessTokenService.getHeaderConfig();

    try {
      const response = await firstValueFrom(
        this.httpService.post<CardAssignmentResponse>(
          `${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/insta`,
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
   * Locks or unlocks a card by sending a POST request to the external API with the provided data.
   *
   * @param CardLockDto data - The data required for card lock/unlock, including card ID and lock status.
   * @returns Promise<CardLockResponse> - The response from the external API, containing the status and card details.
   * @throws {Error} - Throws an error if the request fails.
   */
  async lockCard(data: CardLockDto): Promise<CardLockResponse> {
    const config = await this.accessTokenService.getHeaderConfig();
    try {
      const response = await firstValueFrom(
        this.httpService.post<CardLockResponse>(
          `${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/lock.php`,
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
   * Gets the status of a card by sending a GET request to the external API with the provided card ID.
   * This API allows the user to fetch the status of the card/cards linked to the registered mobile number with which wallet has been created.
   * It gives a list of cards associated with the wallet and their current status.
   * @param {string} cardId - The card ID.
   * @returns {Promise<CardStatusResponse>} - The response from the external API, containing the status and customer data.
   * @throws {Error} - Throws an error if the request fails.
   */
  async getCardStatus(cardId: string): Promise<CardStatusResponse> {
    const config = await this.accessTokenService.getHeaderConfig();

    try {
      const response = await firstValueFrom(
        this.httpService.get<CardStatusResponse>(
          `${this.configService.get('BUSY_BOX_API_BASE_URL')}/card/status/${cardId}`,
          config,
        ),
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

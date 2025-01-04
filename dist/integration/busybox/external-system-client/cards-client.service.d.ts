import { CardAssignmentDto, CardAssignmentResponse } from '../external/interfaces/card-assignment.interface';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AccessTokenClientService } from './access-token-client.service';
import { CardLockDto, CardLockResponse } from '../external/interfaces/lock-unlock.interface';
import { CardStatusResponse } from '../external/interfaces/card-status.interface';
export declare class CardsClientService {
    private readonly httpService;
    private configService;
    private accessTokenService;
    constructor(httpService: HttpService, configService: ConfigService, accessTokenService: AccessTokenClientService);
    assignCard(data: CardAssignmentDto): Promise<CardAssignmentResponse>;
    lockCard(data: CardLockDto): Promise<CardLockResponse>;
    getCardStatus(cardId: string): Promise<CardStatusResponse>;
}

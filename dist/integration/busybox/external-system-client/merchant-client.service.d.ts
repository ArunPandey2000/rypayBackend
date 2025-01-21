import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AccessTokenClientService } from './access-token-client.service';
import { CardIssuanceResponse } from '../external/interfaces/card-issuence-response.interface';
import { CustomerStatusResponse } from '../external/interfaces/customer-status.interface';
export declare class MerchantClientService {
    private readonly httpService;
    private configService;
    private accessTokenService;
    constructor(httpService: HttpService, configService: ConfigService, accessTokenService: AccessTokenClientService);
    issueCard(data: CardIssuanceDto): Promise<CardIssuanceResponse>;
    verifyRegistrationOtp(data: OtpVerificationDto): Promise<OtpVerificationResponse>;
    getCustomerStatus(mobileNumber: string): Promise<CustomerStatusResponse>;
}

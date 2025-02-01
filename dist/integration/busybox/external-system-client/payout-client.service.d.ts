import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { AccessTokenClientService } from './access-token-client.service';
import { IAccountPayoutRequestBody } from '../external/interfaces/payout/payout-request-body.interface';
import { IAccountPayoutResponseDTO } from '../external/interfaces/payout/payout-response-body.interface';
import { IVerifyAccountRequestDTO } from '../external/interfaces/validation/verify-account-request.interface';
import { IVerifyAccountResponseDTO } from '../external/interfaces/validation/verify-account-response.interface';
import { IVerifyUPIRequestDTO } from '../external/interfaces/validation/verify-upi-request.interface';
import { IVerifyUpiResponseDTO } from '../external/interfaces/validation/verify-upi-response.interface copy';
import { IUPIPayoutRequestBody } from '../external/interfaces/payout/payout-upi-request-body.interface';
import { PayoutBalance } from '../external/interfaces/payout/payout-balance-response.interface';
export declare class PayoutClientService {
    private readonly httpService;
    private configService;
    private accessTokenService;
    constructor(httpService: HttpService, configService: ConfigService, accessTokenService: AccessTokenClientService);
    payoutUsingAccount(data: IAccountPayoutRequestBody): Promise<IAccountPayoutResponseDTO>;
    getPoolBalance(): Promise<PayoutBalance>;
    payoutUsingUPI(data: IUPIPayoutRequestBody): Promise<IAccountPayoutResponseDTO>;
    verifyAccount(data: IVerifyAccountRequestDTO): Promise<IVerifyAccountResponseDTO>;
    verifyUpi(data: IVerifyUPIRequestDTO): Promise<IVerifyUpiResponseDTO>;
}

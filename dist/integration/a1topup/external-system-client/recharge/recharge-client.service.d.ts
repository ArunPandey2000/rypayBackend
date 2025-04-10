import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { Logger } from 'nestjs-pino';
import { FetchBillRequestPayload } from '../../external/interfaces/fetch-bill-request.interface';
import { IFetchBillResponse } from '../../external/interfaces/fetch-bill-response.interface';
import { IMobileProviderResponse } from '../../external/interfaces/mobile-provider-info.interface';
import { ICircleApiResponse, IOperatorApiResponse } from '../../external/interfaces/operator-response.interface';
import { IRechargePlanApiResponse } from '../../external/interfaces/recharge-plans-api-response.interface';
import { RechargeRequest } from '../../external/interfaces/recharge-request-body.interface';
import { IRechargeResponse } from '../../external/interfaces/recharge-response.interface';
import { IUtilityBillPaymentRequest } from '../../external/interfaces/utility-bill-payment-request.interface';
import { UtilityBillAPIResponse } from '../../external/interfaces/utility-bill-response.interface';
import { IRegisterOutletRequestPayload } from '../../external/interfaces/register-outlet.interface';
import { RegisterOutletResponseData } from '../../external/interfaces/register-outlet-response.interface';
import { OtpVerificationResponse, RegisterOutletOtpRequestModel } from '../../external/interfaces/register-outlet-verify.interface';
import { OutletStatusRequestModel } from '../../external/interfaces/outlet-status.interface';
import { AEPSBankListResponse } from '../../external/interfaces/aeps-bank-response.interface';
import { OutletLoginRequestModel, OutletLoginResponseModel } from '../../external/interfaces/outlet-login.interface';
import { AEPSMiniStatementRequestModel, AEPSMiniStatementResponseModel } from '../../external/interfaces/aeps-mini-statement.interface';
import { AEPSWithdrawalRequestModel, AEPSWithdrawalResponseModel } from '../../external/interfaces/aeps-withdrawal.interface';
export declare class RechargeClientService {
    private readonly httpService;
    private logger;
    private readonly configService;
    private cacheManager;
    private readonly apiBaseUrl;
    private readonly apiToken;
    constructor(httpService: HttpService, logger: Logger, configService: ConfigService, cacheManager: Cache);
    initRecharge(rechargePayload: RechargeRequest): Promise<IRechargeResponse>;
    registerOutlet(requestData: IRegisterOutletRequestPayload): Promise<RegisterOutletResponseData>;
    verifyOtpForOutletRegistration(requestData: RegisterOutletOtpRequestModel): Promise<OtpVerificationResponse>;
    checkOutletStatus(requestData: OutletStatusRequestModel): Promise<any>;
    getAEPSSupportedBankList(): Promise<AEPSBankListResponse>;
    outletLogin(loginData: OutletLoginRequestModel): Promise<OutletLoginResponseModel>;
    getAepsMiniStatement(miniStatementData: AEPSMiniStatementRequestModel): Promise<AEPSMiniStatementResponseModel>;
    getAepsWithdrawal(withdrawalData: AEPSWithdrawalRequestModel): Promise<AEPSWithdrawalResponseModel>;
    requestAadharOtp(aadharNumber: string): Promise<any>;
    validateAadharOtp(aadharNumber: string, otp: string, sessionId: string): Promise<any>;
    initUtilityPayment(utilityPayload: IUtilityBillPaymentRequest): Promise<UtilityBillAPIResponse>;
    getServiceProvidersList(): Promise<IOperatorApiResponse>;
    getMobileProviderInfo(mobile: string): Promise<IMobileProviderResponse>;
    fetchBill(billPayload: FetchBillRequestPayload): Promise<IFetchBillResponse>;
    getCircleCodeList(): Promise<ICircleApiResponse>;
    getRechargePlansList(operatorId: string): Promise<IRechargePlanApiResponse>;
    getCurrentBalance(): Promise<string>;
}

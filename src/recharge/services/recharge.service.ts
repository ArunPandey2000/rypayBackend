import { BadRequestException, Injectable } from '@nestjs/common';
import { generateRef } from 'src/core/utils/hash.util';
import { RechargeClientService } from 'src/integration/a1topup/external-system-client/recharge/recharge-client.service';
import { FetchBillRequestPayload } from 'src/integration/a1topup/external/interfaces/fetch-bill-request.interface';
import { IRechargeRequest } from 'src/integration/a1topup/external/interfaces/recharge-request-body.interface';
import { WalletService } from 'src/wallet/services/wallet.service';
import { RechargeServiceTypes } from '../constants/recharge-metadata.constant';
import { BillPayloadDetail } from '../dto/bill-detail-payload.dto';
import { FetchBillResponse } from '../dto/bill-response.dto';
import { CircleResponseDto } from '../dto/circle-response.dto';
import { MobileProviderInfo } from '../dto/mobile-provider-info.dto';
import { ProviderInfo } from '../dto/provider-info.dto';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { RechargeApiResponseDto } from '../dto/recharge-response.dto';
import { UtilityBillRequestDto } from '../dto/utility-bill-request.dto';
import { IUtilityBillPaymentRequest } from 'src/integration/a1topup/external/interfaces/utility-bill-payment-request.interface';
import { PlanRequestDto, PlanResponse } from '../dto/plan.dto';

@Injectable()
export class RechargeService {

    constructor(private walletService: WalletService,
        private rechargeClientService: RechargeClientService
    ) {

    }

    getAvailableRechargeServices() {
        return Object.values(RechargeServiceTypes);
    }

    async getServiceProvidersListByServiceId(serviceId: string) {
        const serviceProviders =  await this.rechargeClientService.getServiceProvidersList();
        const filteredProviders = serviceProviders.response.filter((service) => service.service_type === serviceId);
        return (filteredProviders || []).map(provider => new ProviderInfo(provider));
    }

    async getAllCircles() {
        const circleCodeResponse = await this.rechargeClientService.getCircleCodeList();
        return circleCodeResponse.response.map(circle => new CircleResponseDto(circle));
    }
    
      async getCircleByState(state: string) {
        const circles = await this.getAllCircles();
        return circles.find(circle => circle.state === state).circleCode;
      }

    async rechargePrepaidDTHAccount(userId: string, requestDto: RechargeRequestDto) {
        const wallet = await this.walletService.getWallet({user: {id: userId}});
        if (wallet.balance < requestDto.amount) {
            throw new BadRequestException('Insufficient Balance')
        }
        const rechargePayload: IRechargeRequest = {
            state_code: requestDto.circleCode,
            amount: requestDto.amount,
            opid: requestDto.operatorCode,
            number: requestDto.accountNumber,
            order_id: generateRef(10)
        }
        const response = await this.rechargeClientService.initPrepaidOrDTHRecharge(rechargePayload);

        if (typeof response === 'string') {
            throw new BadRequestException(response)
        }

        await this.walletService.processRechargePayment({amount: requestDto.amount,
             receiverId: requestDto.accountNumber,
             serviceUsed: requestDto.operatorCode, // will use service used, mobile / dth
             description: '',
             reference: rechargePayload.order_id }, userId);

        return <RechargeApiResponseDto>{
            referenceId: response.order_id,
            amount: +response.amount
        }
    }

    async payUtilityBill(userId: string, requestDto: UtilityBillRequestDto) {
        const wallet = await this.walletService.getWallet({user: {id: userId}});
        if (wallet.balance < requestDto.amount) {
            throw new BadRequestException('Insufficient Balance')
        }
        const rechargePayload: IUtilityBillPaymentRequest = {
            amount: requestDto.amount.toString(),
            opid: requestDto.operatorCode,
            number: requestDto.accountNumber,
            order_id: generateRef(10),
            mobile: requestDto.mobile,
            reference_id: requestDto.fetchBillReferenceId
        }
        const response = await this.rechargeClientService.initUtilityPayment(rechargePayload);

        if (typeof response === 'string') {
            throw new BadRequestException(response)
        }

        await this.walletService.processRechargePayment({amount: requestDto.amount,
             receiverId: requestDto.accountNumber,
             serviceUsed: requestDto.operatorCode, // will use service used, mobile / dth
             description: '',
             reference: rechargePayload.order_id }, userId);

        return <RechargeApiResponseDto>{
            referenceId: response.order_id,
            amount: +response.amount
        }
    }

    async getMobileProviderInfo(mobile: string): Promise<MobileProviderInfo> {
        const mobileProviderInfo = await this.rechargeClientService.getMobileProviderInfo(mobile);
        const areaCodeApi = this.getCircleByState(mobileProviderInfo.details.Circle);
        const providersApi = this.rechargeClientService.getServiceProvidersList();

        const response = await Promise.all([areaCodeApi, providersApi]);
        const providerData = response[1].response.find((provider) => provider.operator_name === mobileProviderInfo.details.operator);
        return {
            circleId:  response[0],
            circleName: mobileProviderInfo.details.Circle,
            operatorId: providerData.operator_id,
            operatorName: providerData.operator_name
        };
    }

    async getBillDetails(payload: BillPayloadDetail){
        const reqPayload: FetchBillRequestPayload = {
            order_id: payload.sessionId,
            amount: "10",
            number: payload.accountNumber,
            opid: payload.operatorId,
            mobile: payload.mobile,
        };
        const response = await this.rechargeClientService.fetchBill(reqPayload);
        return new FetchBillResponse(response);
    }

    async getPlans(operatorId: string, stateCode: string){
        const plans = await this.rechargeClientService.getRechargePlansList(operatorId, stateCode);
        return new PlanResponse(plans);
    }
}

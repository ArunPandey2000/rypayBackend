import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order, OrderStatus, OrderType } from 'src/core/entities/order.entity';
import { TransactionStatus } from 'src/core/entities/transactions.entity';
import { User } from 'src/core/entities/user.entity';
import { generateRef } from 'src/core/utils/hash.util';
import { RechargeClientService } from 'src/integration/a1topup/external-system-client/recharge/recharge-client.service';
import { FetchBillRequestPayload } from 'src/integration/a1topup/external/interfaces/fetch-bill-request.interface';
import { IElectricityRechargeRequest, IPrepaidOrDTHRechargeRequest } from 'src/integration/a1topup/external/interfaces/recharge-request-body.interface';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { currentRechargeSupported, RechargeServiceTypes } from '../constants/recharge-metadata.constant';
import { gstMapper } from '../constants/recharge-plan-type-mapper.constant';
import { BillPayloadDetail } from '../dto/bill-detail-payload.dto';
import { FetchBillResponse } from '../dto/bill-response.dto';
import { CircleResponseDto } from '../dto/circle-response.dto';
import { ElectricityRechargeDto } from '../dto/electricity-recharge.dto';
import { PlanResponse } from '../dto/plan.dto';
import { ProviderInfo } from '../dto/provider-info.dto';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { RechargeApiResponseDto } from '../dto/recharge-response.dto';

@Injectable()
export class RechargeService {

    constructor(private walletService: WalletService,
        private rechargeClientService: RechargeClientService,
        @InjectRepository(Order) private  orderRepository: Repository<Order>,
        @InjectRepository(User) private  userRepository: Repository<User>
    ) {

    }

    getAvailableRechargeServices() {
        return currentRechargeSupported;
    }

    async getServiceProvidersListByServiceId(serviceId: string) {
        const serviceProviders =  await this.rechargeClientService.getServiceProvidersList();
        const gstProvider = gstMapper[serviceId] ?? 'P2P';
        const filteredProviders = serviceId ? serviceProviders.operatorList.filter((service) => service.serviceType === serviceId && service.gstMode === gstProvider) : serviceProviders.operatorList;
        return (filteredProviders || []).map(provider => new ProviderInfo(provider));
    }

    async getAllCircles() {
        const circleCodeResponse = await this.rechargeClientService.getCircleCodeList();
        return circleCodeResponse.stateList.map(circle => new CircleResponseDto(circle));
    }

    async rechargeAccount(userId: string, requestDto: RechargeRequestDto | ElectricityRechargeDto) {
        const wallet = await this.walletService.getWallet({user: {id: userId}});
        if (wallet.balance < requestDto.amount) {
            throw new BadRequestException('Insufficient Balance')
        }
        const rechargePayload = this.getRechargePayload(requestDto);
        const response = (await this.rechargeClientService.initRecharge(rechargePayload)).data;

        if (response.status === 'FAILED') {
            throw new BadRequestException(response.resText)
        }
        const user = await this.userRepository.findOne({where: {id: userId}});
        const description = requestDto.message ? requestDto.message :  `${requestDto.accountNumber} ${requestDto.rechargeType}`;
        const order = {
            order_id: rechargePayload.urid,
            order_type: OrderType.RECHARGE,
            gateway_response: '',
            amount: requestDto.amount,
            status: OrderStatus.PENDING,
            transaction_id: response.transId,
            user: user,
            description: description,
            payment_method: 'WALLET',
            respectiveUserName: null,
            ifscNumber: null,
            accountId: requestDto.accountNumber
        }
        const SavedOrder = this.orderRepository.create(order);
        this.orderRepository.save(SavedOrder);

        await this.walletService.processRechargePayment({amount: requestDto.amount,
             receiverId: requestDto.accountNumber,
             serviceUsed: requestDto.rechargeType, // will use service used, mobile / dth / electricity
             description: description,
             status: TransactionStatus.PENDING,
             reference: rechargePayload.urid }, userId);

        return <RechargeApiResponseDto>{
            referenceId: SavedOrder.order_id,
            amount: +response.amount,
            message: 'Recharge/Bill payment Successful'
        }
    }

    private getRechargePayload(payload: ElectricityRechargeDto | RechargeRequestDto) {
        let basePayload = {
            amount: payload.amount,
            mobile: payload.accountNumber,
            urid: generateRef(10)
        }
        if (payload.rechargeType === RechargeServiceTypes.Electricity) {
            return <IElectricityRechargeRequest> {
                ...basePayload,
                bbpsId: payload.operatorCode,
                opValue1: (payload as ElectricityRechargeDto).mobile
            }
        }
        return <IPrepaidOrDTHRechargeRequest>{
            ...basePayload,
            operatorId: payload.operatorCode,
        }
    }


    // async getMobileProviderInfo(mobile: string): Promise<MobileProviderInfo> {
    //     const mobileProviderInfo = await this.rechargeClientService.getMobileProviderInfo(mobile);
    //     const areaCodeApi = this.getCircleByState(mobileProviderInfo.details.Circle);
    //     const providersApi = this.rechargeClientService.getServiceProvidersList();

    //     const response = await Promise.all([areaCodeApi, providersApi]);
    //     const providerData = response[1].response.find((provider) => provider.operator_name === mobileProviderInfo.details.operator);
    //     return {
    //         circleId:  response[0],
    //         circleName: mobileProviderInfo.details.Circle,
    //         operatorId: providerData.operator_id,
    //         operatorName: providerData.operator_name
    //     };
    // }

    async getBillDetails(payload: BillPayloadDetail){
        const reqPayload: FetchBillRequestPayload = {
            urid: payload.sessionId,
            customerMobile: payload.mobile,
            bbpsId: payload.operatorId,
            mobile: payload.accountNumber,
            opvalue1: payload.mobile,
            transType: 'billFetch'
        };
        const response = await this.rechargeClientService.fetchBill(reqPayload);
        if (response.status === "SUCCESS") {
            return new FetchBillResponse(response.billData);
        }
        throw new BadRequestException(response.resText);
    }

    async getPlans(operatorId: string, stateCode: string){
        const plans = await this.rechargeClientService.getRechargePlansList(operatorId);
        const stateFilteredPlans = plans.planData.filter((plan) => plan.stateId === stateCode);
        return new PlanResponse(stateFilteredPlans, operatorId, stateCode);
    }
}

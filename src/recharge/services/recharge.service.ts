import { BadRequestException, Injectable } from '@nestjs/common';
import { RechargeMetaData, RechargeServiceTypes } from '../constants/recharge-metadata.constant';
import { RechargeMetaDataResponse } from '../dto/recharge-meta-data.dto';
import { circleData } from '../constants/recharge-circle.constant';
import { WalletService } from 'src/wallet/services/wallet.service';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { RechargeClientService } from 'src/integration/a1topup/external-system-client/recharge/recharge-client.service';
import { IRechargeRequest } from 'src/integration/a1topup/external/interfaces/recharge-request-body.interface';
import { generateRef } from 'src/core/utils/hash.util';
import { RechargeResponseDto } from 'src/integration/a1topup/external/interfaces/recharge-response.interface';
import { RechargeApiResponseDto } from '../dto/recharge-response.dto';

@Injectable()
export class RechargeService {

    constructor(private walletService: WalletService,
        private rechargeClientService: RechargeClientService
    ) {

    }

    getAvailableRechargeServices() {
        return Object.values(RechargeServiceTypes);
    }

    getServiceProvidersListByServiceId(serviceId: string) {
        return RechargeMetaData.filter(metaData => metaData.type === serviceId)
        .map((metaData) => (<RechargeMetaDataResponse>{
            providerCode: metaData.code,
            providerName: metaData.name,
            serviceType: metaData.type
        }));
    }

    getAllCircles() {
        return circleData;
      }
    
      getCircleByState(state: string) {
        return circleData.find(circle => circle.state === state).circleCode;
      }

    async rechargeAccount(userId: string, requestDto: RechargeRequestDto) {
        const wallet = await this.walletService.getWallet({user: {id: userId}});
        if (wallet.balance < requestDto.amount) {
            throw new BadRequestException('Insufficient Balance')
        }
        const rechargePayload: IRechargeRequest = {
            circlecode: requestDto.circleCode,
            amount: requestDto.amount,
            operatorcode: requestDto.operatorCode,
            number: requestDto.accountNumber,
            orderid: generateRef(10)
        }
        const response = await this.rechargeClientService.makeRecharge(rechargePayload);

        if (typeof response === 'string') {
            throw new BadRequestException(response)
        }

        await this.walletService.processRechargePayment({amount: requestDto.amount,
             receiverId: requestDto.accountNumber,
             serviceUsed: requestDto.operatorCode, // will use service used, mobile / dth
             description: '',
             reference: rechargePayload.orderid }, userId);

        return <RechargeApiResponseDto>{
            referenceId: response.orderid,
            amount: +response.amount
        }

    }
}

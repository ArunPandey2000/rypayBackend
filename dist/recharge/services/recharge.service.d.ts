import { Order } from 'src/core/entities/order.entity';
import { User } from 'src/core/entities/user.entity';
import { RechargeClientService } from 'src/integration/a1topup/external-system-client/recharge/recharge-client.service';
import { WalletService } from 'src/wallet/services/wallet.service';
import { Repository } from 'typeorm';
import { BillPayloadDetail } from '../dto/bill-detail-payload.dto';
import { FetchBillResponse } from '../dto/bill-response.dto';
import { CircleResponseDto } from '../dto/circle-response.dto';
import { ElectricityRechargeDto } from '../dto/electricity-recharge.dto';
import { PlanResponse } from '../dto/plan.dto';
import { ProviderInfo } from '../dto/provider-info.dto';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { RechargeApiResponseDto } from '../dto/recharge-response.dto';
export declare class RechargeService {
    private walletService;
    private rechargeClientService;
    private orderRepository;
    private userRepository;
    constructor(walletService: WalletService, rechargeClientService: RechargeClientService, orderRepository: Repository<Order>, userRepository: Repository<User>);
    getAvailableRechargeServices(): string[];
    getServiceProvidersListByServiceId(serviceId: string): Promise<ProviderInfo[]>;
    getAllCircles(): Promise<CircleResponseDto[]>;
    rechargeAccount(userId: string, requestDto: RechargeRequestDto | ElectricityRechargeDto): Promise<RechargeApiResponseDto>;
    private getRechargePayload;
    getBillDetails(payload: BillPayloadDetail): Promise<FetchBillResponse>;
    getPlans(operatorId: string, stateCode: string): Promise<PlanResponse>;
}

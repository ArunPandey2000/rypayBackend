import { BillPayloadDetail } from '../dto/bill-detail-payload.dto';
import { FetchBillResponse } from '../dto/bill-response.dto';
import { ElectricityRechargeDto } from '../dto/electricity-recharge.dto';
import { PlanRequestDto, PlanResponse } from '../dto/plan.dto';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { RechargeService } from '../services/recharge.service';
export declare class RechargeController {
    private rechargeService;
    constructor(rechargeService: RechargeService);
    getServiceProviders(serviceId?: string): Promise<{
        data: import("../dto/provider-info.dto").ProviderInfo[];
    }>;
    getAvailableRechargeServices(): string[];
    getAllCircles(): Promise<{
        data: import("../dto/circle-response.dto").CircleResponseDto[];
    }>;
    rechargeUser(req: any, rechargeDto: RechargeRequestDto): Promise<import("../dto/recharge-response.dto").RechargeApiResponseDto>;
    payElectricityBill(req: any, rechargeDto: ElectricityRechargeDto): Promise<import("../dto/recharge-response.dto").RechargeApiResponseDto>;
    getBillDetails(billPayload: BillPayloadDetail): Promise<FetchBillResponse>;
    getPlanDetails(planPayload: PlanRequestDto): Promise<PlanResponse>;
}

import { Body, Controller, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CircleResponseDto } from '../dto/circle-response.dto';
import { MobileProviderInfo } from '../dto/mobile-provider-info.dto';
import { ProviderInfo } from '../dto/provider-info.dto';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { RechargeService } from '../services/recharge.service';
import { BillPayloadDetail } from '../dto/bill-detail-payload.dto';
import { UtilityBillRequestDto } from '../dto/utility-bill-request.dto';
import { FetchBillResponse } from '../dto/bill-response.dto';
import { BillPaymentResponse } from '../dto/bill-payment-response.dto';
import { PlanRequestDto, PlanResponse } from '../dto/plan.dto';

@ApiTags('Recharge')
@Controller('recharge')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RechargeController {

    constructor(private rechargeService: RechargeService) {

    }

  @Get('/operators')
  @ApiQuery({ name: 'serviceId', required: false, description: 'get service providers by recharge service type' })
  @ApiResponse({type: Array<ProviderInfo>})
  getServiceProviders(@Query('serviceId') serviceId?: string) {
      return this.rechargeService.getServiceProvidersListByServiceId(serviceId);
  }

  @Get('/services')
  @ApiResponse({type: Array<string>})
  getAvailableRechargeServices() {
    return this.rechargeService.getAvailableRechargeServices();
  }

  @Get('circle/:state')
  @ApiParam({ name: 'state', required: true, description: 'The state to get the circle code for' })
  @ApiResponse({ type: 'string', status: 200, description: 'Returns the circle code for a specific state.' })
  @ApiResponse({ status: 404, description: 'State not found.' })
  getCircleByState(@Param('state') state: string) {
    const circle = this.rechargeService.getCircleByState(state);
    if (!circle) {
      throw new NotFoundException('State not found');
    }
    return circle;
  }

  @Get('/circle')
  @ApiResponse({ type: Array<CircleResponseDto>, status: 200, description: 'Returns the list of all circles.' })
  getAllCircles() {
    return this.rechargeService.getAllCircles();
  }

  @Post('/prepaid-dth')
  rechargeUser(@Req() req: any, @Body() rechargeDto: RechargeRequestDto) {
    const userId = req.user.sub;
    return this.rechargeService.rechargePrepaidDTHAccount(userId, rechargeDto);
  }

  @Post('/utility-bills')
  @ApiResponse({ type: BillPaymentResponse, status: 200, description: 'Returns the bill payment response.' })
  payUtilityBill(@Req() req: any, @Body() utilityBill: UtilityBillRequestDto) {
    const userId = req.user.sub;
    return this.rechargeService.payUtilityBill(userId, utilityBill);
  }

  @Get('/info/:mobile')
  @ApiResponse({ type: MobileProviderInfo, status: 200, description: 'Returns the detail of operator provider.' })
  getMobileProviderInfo(@Param('mobile') mobile: string) {
    return this.rechargeService.getMobileProviderInfo(mobile);
  }

  @Get('/bill/details')
  @ApiResponse({type: FetchBillResponse})
  getBillDetails(@Body() billPayload: BillPayloadDetail) {
      return this.rechargeService.getBillDetails(billPayload);
  }

  @Get('/plans')
  @ApiResponse({type: PlanResponse})
  getPlanDetails(@Body() planPayload: PlanRequestDto) {
      return this.rechargeService.getPlans(planPayload.operatorId, planPayload.circleCode);
  }
}

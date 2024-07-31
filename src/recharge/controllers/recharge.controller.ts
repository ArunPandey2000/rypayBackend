import { Body, Controller, Get, NotFoundException, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RechargeService } from '../services/recharge.service';
import { RechargeMetaDataResponse } from '../dto/recharge-meta-data.dto';
import { RechargeRequestDto } from '../dto/recharge-request.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CircleResponseDto } from '../dto/circle-response.dto';

@ApiTags('Recharge')
@Controller('recharge')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class RechargeController {

    constructor(private rechargeService: RechargeService) {

    }

  @Get('/providers')
  @ApiQuery({ name: 'serviceId', required: false, description: 'get service providers by recharge service type' })
  @ApiResponse({type: Array<RechargeMetaDataResponse>})
  getServiceProviders(@Query('serviceId') serviceId?: string) {
      return this.rechargeService.getServiceProvidersListByServiceId(serviceId);
  }

  @Get('/services')
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
  @ApiResponse({ type: CircleResponseDto, status: 200, description: 'Returns the list of all circles.' })
  getAllCircles() {
    return this.rechargeService.getAllCircles();
  }

  @Post('/')
  rechargeUser(@Req() req: any, @Body() rechargeDto: RechargeRequestDto) {
    const userId = req.user.sub;
    return this.rechargeService.rechargeAccount(userId, rechargeDto);
  }
}

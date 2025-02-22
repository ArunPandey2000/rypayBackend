import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PlanResponseDto } from './dto/plan-response.dto';

@ApiTags('Subscriptions')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Get('plans')
  @ApiResponse({
    status: 200,
    description: 'Get all plans with their limits.',
    type: [PlanResponseDto],
  })
  async getAllPlansWithLimits(): Promise<PlanResponseDto[]> {
    return await this.subscriptionsService.findAllWithLimits();
  }

  @Get('plan/:id')
  @ApiResponse({
    status: 200,
    description: 'Get a specific plan with its limits.',
    type: PlanResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Plan not found.',
  })
  async getPlanWithLimits(@Param('id') id: string): Promise<PlanResponseDto> {
    return await this.subscriptionsService.findOneWithLimits(id);
  }

  @Post('upgrade/cost')
  @ApiOperation({
    summary: 'Calculate Upgrade Cost',
    description: 'Calculate the cost required to upgrade a user to a new subscription plan.',
  })
  @ApiResponse({
    status: 200,
    description: 'Upgrade cost calculated successfully.',
    schema: {
      example: {
        userId: '12345',
        currentPlan: 'Free Plan',
        newPlan: 'Basic Plan',
        upgradeCost: 100,
      },
    },
  })
  @ApiBody({
    description: 'Provide the plan Id to calculate the upgrade cost.',
    schema: {
      type: 'object',
      properties: {
        newPlanId: { type: 'string', example: '321324121' },
      },
    },
  })
  async getUpgradeCost(@Req() req: any, @Body() body: { newPlan: string }) {
    return this.subscriptionsService.calculateUpgradeCost(req.user.sub, body.newPlan);
  }

  @Post('upgrade/confirm')
  @ApiOperation({
    summary: 'Confirm Upgrade Plan',
    description: 'Confirm and perform the upgrade of a user to a new subscription plan.',
  })
  @ApiResponse({
    status: 200,
    description: 'Subscription upgraded successfully.',
    schema: {
      example: {
        userId: '12345',
        oldPlan: 'Free Plan',
        newPlan: 'Basic Plan',
        upgradeCost: 100,
        status: 'Success',
      },
    },
  })
  @ApiBody({
    description: 'Provide the user ID and the new plan to confirm the upgrade.',
    schema: {
      type: 'object',
      properties: {
        userId: { type: 'string', example: '12345' },
        newPlan: { type: 'string', example: 'Basic Plan' },
      },
    },
  })
  async confirmUpgrade(@Body() body: { userId: string; newPlan: string }) {
    return this.subscriptionsService.upgradePlan(body.userId, body.newPlan);
  }
}


import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CoinsDto, RedemptionRuleDto } from './dto/redemption-rules.dto';
import { CoinTransactionService } from './coins.service';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AddCoinDto } from './dto/add-coin.dto';

@Controller('coins')
@ApiTags('Coins')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class CoinsController {

    constructor(private coinsService: CoinTransactionService) {

    }

    @Get('/redeem-options')
    @ApiOperation({
        summary: 'Get available redemption options',
        description: 'Fetches a list of available redemption rules with RyCoin to ₹ value mappings.',
    })
    @ApiResponse({
    status: 200,
    description: 'Redemption options retrieved successfully.',
    type: [RedemptionRuleDto],
    })
    @ApiResponse({
    status: 404,
    description: 'No redemption options found.',
    })
    async getRedemptionOptions(): Promise<RedemptionRuleDto[]> {
        return this.coinsService.getRedemptionRules();
    }

    @Get('/coins')
    @ApiOperation({
        summary: 'Get available coins',
        description: 'returns user available coins',
    })
    @ApiResponse({
    status: 200,
    description: 'user available coins.',
    type: CoinsDto,
    })
    @ApiResponse({
    status: 404,
    description: 'No redemption options found.',
    })
    async getCoins(@Req() req: any): Promise<CoinsDto> {
        return this.coinsService.getCoins(req.user.sub);
    }

    @Post('/add-coin')
    @ApiOperation({
        summary: 'Add coins',
        description: 'Add coins for test.',
    })
    @ApiResponse({
    status: 200,
    description: 'Redemption options retrieved successfully.',
    type: [RedemptionRuleDto],
    })
    @ApiResponse({
    status: 404,
    description: 'No redemption options found.',
    })
    async addCoins(@Req() req: any, @Body() body: AddCoinDto ): Promise<string> {
        await this.coinsService.addCoins(req.user.sub, 5000, '1');
        return "Success"
    }

    @Post('/redeem/:redemptionId')
    @ApiOperation({
        summary: 'Redeem RyCoins for a value in ₹',
        description: 'Redeems RyCoins for a specific value in ₹ based on selected redemption rule.',
      })
    @ApiParam({
        type: 'string',
        name: 'redemptionId'
    })
    @ApiResponse({
    status: 200,
    description: 'Successfully redeemed RyCoins for the selected ₹ value.',
    schema: {
        type: 'object',
        properties: {
        message: { type: 'string', example: 'Successfully redeemed 5000 RyCoins for ₹25.' },
        redemptionValue: { type: 'number', example: 25 },
        },
    },
    })
    async redeemCoins(
        @Req() req: any, @Param('redemptionId') redemptionId: string
    ): Promise<{ message: string; redemptionValue: number }> {
        return this.coinsService.redeemCoins(req.user.sub, redemptionId);
    }
}

import { Body, Controller, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CardsService } from '../services/cards.service';

@Controller('cards')
@ApiTags('Cards')
@UseGuards(JwtAuthGuard)
export class CardsController {

    constructor(
        private cardsService: CardsService
    ){

    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint to request physical card' })
    @Post('/:mobile')
    async requestPhysicalCard(@Param('mobile') phone: string) {
        const cardDetails = await this.cardsService.requestPhysicalCard(phone);
        return { data: cardDetails, statusCode: 200 };
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Endpoint to lock unlock card' })
    @Patch()
    async lockUnlockCard(@Req() req: any, @Body('cardStatus') cardStatus: boolean) {
        const cardLockInfo = await this.cardsService.lockUnlockCard(req.user.sub, cardStatus);
        return { data: cardLockInfo, statusCode: 200 };
    }

}

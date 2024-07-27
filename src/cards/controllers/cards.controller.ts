import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CardsService } from '../services/cards.service';

@Controller('cards')
@ApiTags('Cards')
export class CardsController {


    constructor(
        private cardsService: CardsService
    ){

    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: 'Endpoint to request physical card' })
    @Post('/:mobile')
    async getBalance(@Param('mobile') phone: string) {
        const cardDetails = await this.cardsService.requestPhysicalCard(phone);
        return { data: cardDetails, statusCode: 200 };
    }

}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CardsClientService } from 'src/integration/busybox/external-system-client/cards-client.service';
import { CardAssignmentDto } from 'src/integration/busybox/external/interfaces/card-assignment.interface';

@Injectable()
export class CardsService {

    constructor(
        private cardsClientService: CardsClientService,
        private configService: ConfigService
    ) {

    }

    async requestPhysicalCard(phone: string) {
        const assognCardDto: CardAssignmentDto = {
            mobile_number: phone,
            orgId: this.configService.get(''),
            kitNumber: '' // will assign a kit number to each user
        }
        await this.cardsClientService.assignCard(assognCardDto);
    }
}

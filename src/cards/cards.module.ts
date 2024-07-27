import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntegrationModule } from 'src/integration/integration.module';
import { CardsController } from './controllers/cards.controller';
import { CardsService } from './services/cards.service';

@Module({
  imports: [IntegrationModule, ConfigModule],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}

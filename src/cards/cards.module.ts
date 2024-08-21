import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IntegrationModule } from 'src/integration/integration.module';
import { CardsController } from './controllers/cards.controller';
import { CardsService } from './services/cards.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Card } from 'src/core/entities/card.entity';
import { User } from 'src/core/entities/user.entity';
import { KitNumber } from 'src/core/entities/kit-number.entity';
import { KitNumberController } from './controllers/kit-number.controller';
import { KitNumberService } from './services/kit-number.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [IntegrationModule, LoggerModule.forRoot({
    pinoHttp: {
      transport: {
        target: 'pino-pretty',
        options: {
          singleLine: true,
        },
      },
    },
  }), ConfigModule, TypeOrmModule.forFeature([Card, User, KitNumber ])],
  providers: [CardsService, KitNumberService],
  controllers: [CardsController, KitNumberController],
  exports: [CardsService, KitNumberService]
})
export class CardsModule {}

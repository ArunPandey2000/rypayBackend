import { Module } from '@nestjs/common';
import { MoneyRequestService } from './money-request.service';
import { MoneyRequestController } from './money-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { MoneyRequest } from 'src/core/entities/money-request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, MoneyRequest])],
  controllers: [MoneyRequestController],
  providers: [MoneyRequestService],
})
export class MoneyRequestModule {}

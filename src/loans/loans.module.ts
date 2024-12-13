import { Module } from '@nestjs/common';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Loan } from 'src/core/entities/loan.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Loan])
  ],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}

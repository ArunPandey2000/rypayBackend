import { Module } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { BeneficiaryController } from './beneficiary.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Beneficiary } from 'src/core/entities/beneficiery.entity';
import { User } from 'src/core/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Beneficiary, User])],
  controllers: [BeneficiaryController],
  providers: [BeneficiaryService],
})
export class BeneficiaryModule {}

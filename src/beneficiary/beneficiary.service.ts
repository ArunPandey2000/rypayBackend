import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Beneficiary } from 'src/core/entities/beneficiery.entity';
import { Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { BeneficiaryResponseDto } from './dto/beneficiary-response.dto';

@Injectable()
export class BeneficiaryService {

  constructor(
    @InjectRepository(Beneficiary) private beneficiaryRepo: Repository<Beneficiary>,
    @InjectRepository(User) private userRepo: Repository<User>

  ) {

  }

  async createBeneficiary(userId: string, createBeneficiaryDto: CreateBeneficiaryDto) {
    const user = await this.userRepo.findOne({where: {id: userId}});
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    const account = await this.beneficiaryRepo.findOne({
      where: {
        bankAccountNumber: createBeneficiaryDto.bankAccountNumber
      }
    })
    if (account) {
      throw new BadRequestException('Account number already exist with existing beneficiary');
    }
    await this.beneficiaryRepo.save({
      user,
      nameInBank: createBeneficiaryDto.name,
      ifscCode: createBeneficiaryDto.ifscCode,
      bankAccountNumber: createBeneficiaryDto.bankAccountNumber
    })
    return {
      message: "Success"
    }
  }

  async findAll(userId: string) {
    const beneficiaries =  await this.beneficiaryRepo.find({
      where: {
        user: {
          id: userId
        }
      } 
    });
    return beneficiaries.map((beneficiary) => new BeneficiaryResponseDto(beneficiary));
  }

  async update(userId: string, accountNumber: string, updateBeneficiaryDto: UpdateBeneficiaryDto) {
    const user = await this.userRepo.findOne({where: {id: userId}});
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    const account = await this.beneficiaryRepo.findOne({
      where: {
        bankAccountNumber: accountNumber
      }
    })
    if (!account) {
      throw new BadRequestException('Account number does not exist');
    }
    await this.beneficiaryRepo.update({
      bankAccountNumber: accountNumber,
      },
      {
        ifscCode: updateBeneficiaryDto.ifscCode,
        bankAccountNumber: updateBeneficiaryDto.bankAccountNumber,
        nameInBank: updateBeneficiaryDto.name
      }
    );
    return {
      message: "Success"
    }
  }

  async remove(userId: string, accountNumber: string) {
    const user = await this.userRepo.findOne({where: {id: userId}});
    if (!user) {
      throw new UnauthorizedException('user not found');
    }
    const account = await this.beneficiaryRepo.findOne({
      where: {
        bankAccountNumber: accountNumber
      }
    })
    if (!account) {
      throw new BadRequestException('Account number does not exist');
    }
    await this.beneficiaryRepo.delete({
      bankAccountNumber: accountNumber,
      },
    );
    return {
      message: "Success"
    }
  }
}

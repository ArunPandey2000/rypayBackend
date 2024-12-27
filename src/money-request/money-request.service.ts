import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateMoneyRequestDto } from './dto/create-money-request.dto';
import { AccountDetailsConst, AllowedStatuses, MoneyRequestStatuses } from './constants/account-details.constant';
import { InjectRepository } from '@nestjs/typeorm';
import { MoneyRequest } from 'src/core/entities/money-request.entity';
import { Between, In, Like, Repository } from 'typeorm';
import { User } from 'src/core/entities/user.entity';
import { MoneyRequestDto, MoneyRequestQueryDto } from './dto/money-request.dto';
import { Pagination } from 'src/transactions/dto/pagination-response.dto';

@Injectable()
export class MoneyRequestService {

  constructor(
    @InjectRepository(MoneyRequest) private moneyRequestRepo: Repository<MoneyRequest>,
    @InjectRepository(User) private userRepo: Repository<User>,
) {

  }
  async create(userId: string, createMoneyRequestDto: CreateMoneyRequestDto) {
    let isSuccess = true;
    try {
      if (!userId) {
        throw new BadRequestException('userId not found');
      }
      const user = await this.userRepo.findOneBy({id: userId});
      if (!user) {
        throw new ForbiddenException('user not found')
      }
      const moneyRequest = this.moneyRequestRepo.create({
        modeOfPayment: createMoneyRequestDto.modeOfPayment,
        paidAt: createMoneyRequestDto.paidAt,
        paidAmount: createMoneyRequestDto.paidAmount,
        UTR: createMoneyRequestDto.UTR,
        user: user
      });
      await this.moneyRequestRepo.save(moneyRequest);
    } catch(err) {
      isSuccess = false;
      throw err
    }
    return {
      isSuccess
    }
  }

  async findAll(queryDto: MoneyRequestQueryDto) {
    const { page = 1, pageSize = 10 } = queryDto.pagination || {};
        const skipRecords = pageSize * (page - 1);
    
        const { search, status, fromDate, toDate, sortDirection } = queryDto;
    
        // Build the base query
        const baseWhere: any = {
          ...(status && { status: status }),
          ...(fromDate && toDate && { paidAt: Between(new Date(fromDate), new Date(toDate)) }),
        };

        // Add search condition if available
        let searchConditions = [];
        if (search) {
          searchConditions = [
            { UTR: Like(`%${search}%`) },
            { modeOfPayment: Like(`%${search}%`) },
          ];
        }

        // Combine baseWhere with OR conditions
        const where = search ? [baseWhere, ...searchConditions] : baseWhere;
    
        // Fetch paginated requests
        const requests = await this.moneyRequestRepo.find({
          where: where,
          order: { createdAt: sortDirection },
          take: pageSize,
          skip: skipRecords,
        });
    
        // Count the total number of requests for pagination
        const total = await this.moneyRequestRepo.count({ where: where });
    
        
        const result = requests.map((request) => new MoneyRequestDto(request));
    
        // Return the paginated response using your custom Pagination class
        return new Pagination().PaginateResponse(result, total, page, pageSize);
  }

  getAccountDetails() {
    return [AccountDetailsConst];
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('request id is required');
    }
    const data = await this.moneyRequestRepo.findOneBy({
      id
    })
    if (!data) {
      throw new NotFoundException('request not found');
    }
    return new MoneyRequestDto(data);
  }

  async updateRequest(id: number, status: MoneyRequestStatuses) {
    let success = true;
    try {
      if (!id) {
        throw new BadRequestException('request id is required');
      }
      if (!Object.values(AllowedStatuses).includes(status)) {
        throw new BadRequestException(`${status} is not allowed`)
      }
      const request = await this.moneyRequestRepo.findOneBy({id: id});
      if (!request) {
        throw new BadRequestException('Request Id not found');
      }
      await this.moneyRequestRepo.update({id: id}, {
        status
      });
    } catch(err) {
      success = false
    }
    return {
      success
    }
  }

  remove(id: number) {
    return `This action removes a #${id} moneyRequest`;
  }
}

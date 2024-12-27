import { Controller, Get, Post, Body, Patch, Param, Delete, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { MoneyRequestService } from './money-request.service';
import { CreateMoneyRequestDto } from './dto/create-money-request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccountDetails } from './dto/account-details.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MoneyRequestDto, MoneyRequestQueryDto, MoneyRequestResponseDto } from './dto/money-request.dto';
import { MoneyRequestStatuses } from './constants/account-details.constant';

@Controller('money-request')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Money-Request')
export class MoneyRequestController {
  constructor(private readonly moneyRequestService: MoneyRequestService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to create money request' })
  @ApiResponse({ 
      status: HttpStatus.OK,
      type: MoneyRequestResponseDto,
      description: 'Returns if money request completed.',
  })
  create(@Req() req: any, @Body() createMoneyRequestDto: CreateMoneyRequestDto) {
    return this.moneyRequestService.create(req.user.sub, createMoneyRequestDto);
  }

  @Post('list')
  @ApiOperation({ summary: 'Endpoint to get list of money request' })
  findAll(@Body() moneyRequestQuery: MoneyRequestQueryDto) {
    return this.moneyRequestService.findAll(moneyRequestQuery);
  }

  @Get('account-details')
  @ApiOperation({ summary: 'Endpoint to create money request' })
  @ApiResponse({ 
      status: HttpStatus.OK,
      type: [AccountDetails],
      description: 'Returns if phone number exist.',
  })
  getAccountDetails() {
    return this.moneyRequestService.getAccountDetails();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Endpoint to get money request detail' })
  @ApiResponse({ 
      status: HttpStatus.OK,
      type: MoneyRequestDto,
      description: 'Returns if phone number exist.',
  })
  findOne(@Param('id') id: string) {
    return this.moneyRequestService.findOne(+id);
  }

  @Patch('complete/:id')
  @ApiOperation({ summary: 'Endpoint to update money request status' })
  @ApiResponse({ 
      status: HttpStatus.OK,
      type: MoneyRequestResponseDto,
      description: 'Returns if phone number exist.',
  })
  completeMoneyRequest(@Param('id') id: string, @Body('status') status: MoneyRequestStatuses) {
    return this.moneyRequestService.updateRequest(+id, status);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { LoanAdminResponseDto, LoanResponseDto } from './dto/loan.dto';
import { PayloanDto } from './dto/pay-loan.dto';

@ApiTags('Loans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loan' })
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 201, description: 'The loan has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.createLoan(createLoanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loans' })
  @ApiResponse({ status: 200, type: LoanAdminResponseDto, description: 'List of all loans.' })
  @UseGuards(AdminGuard)
  findAll() {
    return this.loansService.findAllLoans();
  }

  @Get('/user')
  @ApiOperation({ summary: 'Get all loans of user' })
  @ApiResponse({ status: 200, type: LoanResponseDto, description: 'List of all loans of user.' })
  findAllLoansOfUser(@Req() req: any) {
    return this.loansService.findAllUserLoans(req.user.sub);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get loan by ID' })
  @ApiResponse({ status: 200, description: 'Loan details.' })
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'updates loan data' })
  @ApiResponse({ status: 200, description: 'The loan has been updated.' })
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.updateLoan(+id, updateLoanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete loan data' })
  @ApiResponse({ status: 200, description: 'The loan has been deleted.' })
  @UseGuards(AdminGuard)
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }

  @Post('/pay')
  @ApiOperation({ summary: 'pay loan' })
  @ApiResponse({ status: 200, description: 'Loan amount paid by user.' })
  @ApiResponse({ status: 404, description: 'Loan Id not found.' })
  PayLoan(@Req() req: any, @Body() loanPaymentDto: PayloanDto) {
    return this.loansService.payLoan(req.user.sub, loanPaymentDto);
  }
}

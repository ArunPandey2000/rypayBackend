import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@ApiTags('Loans')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new loan' })
  @ApiResponse({ status: 201, description: 'The loan has been successfully created.' })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.createLoan(createLoanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all loans' })
  @ApiResponse({ status: 200, description: 'List of all loans.' })
  findAll() {
    return this.loansService.findAll();
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
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.updateLoan(+id, updateLoanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete loan data' })
  @ApiResponse({ status: 200, description: 'The loan has been deleted.' })
  @ApiResponse({ status: 404, description: 'Loan not found.' })
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}

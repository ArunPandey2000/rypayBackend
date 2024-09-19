import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { BeneficiaryService } from './beneficiary.service';
import { CreateBeneficiaryDto } from './dto/create-beneficiary.dto';
import { UpdateBeneficiaryDto } from './dto/update-beneficiary.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BeneficiaryResponseDto, MessageResponse } from './dto/beneficiary-response.dto';

@Controller('beneficiary')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiTags('Beneficiary')
export class BeneficiaryController {
  constructor(private readonly beneficiaryService: BeneficiaryService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new beneficiary' })
  @ApiResponse({ status: 201, description: 'The beneficiary has been successfully created.', type: MessageResponse  })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  create(@Req() req: any, @Body() createBeneficiaryDto: CreateBeneficiaryDto) {
    const userId = req.user.sub;
    return this.beneficiaryService.createBeneficiary(userId, createBeneficiaryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Gets a list of benificiaries' })
  @ApiResponse({ status: 200, description: 'Returns List of Benficiaries.'  })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  findAll(@Req() req: any) {
    const userId = req.user.sub;
    return this.beneficiaryService.findAll(userId);
  }

  @Patch(':accountid')
  @ApiOperation({ summary: 'Updates a new beneficiary' })
  @ApiResponse({ status: 200, description: 'The Benficiary has been updated.'  })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  update(@Req() req: any, @Param('accountid') accountid: string, @Body() updateBeneficiaryDto: UpdateBeneficiaryDto) {
    const userId = req.user.sub;
    return this.beneficiaryService.update(userId, accountid, updateBeneficiaryDto);
  }

  @Delete(':accountid')
  @ApiOperation({ summary: 'Deletes a new beneficiary' })
  @ApiResponse({ status: 201, description: 'The beneficiary has been deleted successfully'  })
  @ApiResponse({ status: 401, description: 'UnAuthorized' })
  remove(@Req() req: any, @Param('accountid') accountid: string) {
    const userId = req.user.sub;
    return this.beneficiaryService.remove(userId, accountid);
  }
}

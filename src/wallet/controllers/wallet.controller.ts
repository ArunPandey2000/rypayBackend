import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { generateHash, generateRef } from 'src/core/utils/hash.util';
import { AddMoneyToWalletDto, TransferMoneyDto } from '../dto/transfer-money.dto';
import { WalletService } from '../services/wallet.service';
import { Request } from 'express';

@Controller('wallet')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Wallet')
export class WalletController {

    constructor(
        private walletService: WalletService
    ) {

    }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to get wallet details by wallet id' })
  @Get('/:id')
  async getWalletDetails(@Param('id') walletId: number) {
    // const walletDetails = await this.walletService.getBalance(walletId);
    // return { data: walletDetails, statusCode: 200 };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to get wallet details by phone' })
  @Get('/mobile/:number')
  async getBalanceByUserID(@Param('number') phoneNumber: string) {
    // const walletDetails = await this.walletService.getWalletDetailsByPhoneNumber(phoneNumber);
    // return { data: walletDetails, statusCode: 200 };
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getWallet(@Req() req: any) {
    return await this.walletService.getWallet({
      user: { id: Number(req.user.sub) },
    });
  }

  @Post('add-money')
  @HttpCode(HttpStatus.OK)
  async addMoneyToWallet(
    @Req() req: Request,
    @Body()
    fundMyAccountDto: AddMoneyToWalletDto,
  ) {
    const reference = generateRef(10);
    const transactionHash = generateHash();

    fundMyAccountDto.reference = reference;
    fundMyAccountDto.transactionHash = transactionHash;

    const transaction = await this.walletService.AddMoneyToWallet(
      fundMyAccountDto, req
    );

    return {
      transaction
    }
  }

  @Post('transfer-to-user')
  @HttpCode(HttpStatus.OK)
  async transferToUserByEmail(
    @Req() req: Request,
    @Body()
    transferAccountDto: TransferMoneyDto,
  ) {
    const reference = generateRef(10);
    const transactionHash = generateHash();

    transferAccountDto.reference = reference;
    transferAccountDto.transactionHash = transactionHash;

    await this.walletService.processFundTransfer(transferAccountDto, req);

    return {
      message: `Wallet Fund Transfer To ${transferAccountDto.receiverAccountNo} was successful`,
      isSuccess: true
    }
  }

  @Get('get-details/:accountNumber')
  @HttpCode(200)
  async getDetails(@Req() req: Request) {
    const accountNumber = req.params.accountNumber;
    if (!accountNumber) {
      throw new BadRequestException(
        'Account number is required'
      );
    }

    if (accountNumber.length !== 10) {
      throw new BadRequestException(
        'Account number must be 10 characters long'
      );
    }

    const details = await this.walletService.getOne({
      walletAccountNo: String(accountNumber),
    });

    if (!details) {
      throw new BadRequestException(
        `It seems this account number ${accountNumber} does not exist in our records`
      );
    }

    const data = {
      accountName: `${details.user.firstName} ${details.user.lastName}`,
      accountNumber: details.walletAccountNo,
    };

    return {
      data,
      message: `Account wallet details fetched successfully`
    }
  }

}

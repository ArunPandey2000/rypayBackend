import { BadRequestException, Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { generateHash, generateRef } from 'src/core/utils/hash.util';
import { AddMoneyToWalletDto, TransferMoneyDto } from '../dto/transfer-money.dto';
import { WalletService } from '../services/wallet.service';
import { Request, Response } from 'express';
import { AdminGuard } from 'src/auth/guards/admin.guard';

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
  @Get('qr')
  async getWalletQr(@Req() req: any, @Res() res: Response) {
    const content = await  this.walletService.getWalletQRCode({user: {id: req.user.sub}});
    res.set({
      'Content-Type': 'text/html'
    });
    res.send(content)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to get wallet details by wallet id' })
  @Get('/:id')
  async getWalletDetailsByWalletId(@Param('id') walletId: string) {
    return await this.walletService.getWallet({
      walletAccountNo: walletId
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, AdminGuard)
  @ApiOperation({ summary: 'Endpoint to get wallet details by user id | ADMIN' })
  @Get('/user/:userId')
  async getWalletDetailsByUserId(@Param('userId') userId: string) {
    return await this.walletService.getWallet({
      user: {
        id: userId
      }
    });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Endpoint to get wallet details by phone' })
  @Get('/mobile/:number')
  async getWalletDetailsByPhone(@Param('number') phoneNumber: string) {
    return await this.walletService.getWallet({
      user: {phoneNumber: phoneNumber}
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async getWallet(@Req() req: any) {
    return await this.walletService.getWallet({
      user: { id: req.user.sub },
    });
  }

  @Post('update-money/:userId')
  @UseGuards(AdminGuard)
  @HttpCode(HttpStatus.OK)
  async updateMoneyToWallet(
    @Param('userId') userId: string,
    @Body() fundMyAccountDto: AddMoneyToWalletDto,
  ) {
    const reference = generateRef(12);
    const transactionHash = generateHash();

    fundMyAccountDto.reference = reference;
    fundMyAccountDto.transactionHash = transactionHash;

    const wallet = await this.walletService.UpdateMoneyToWallet(
      fundMyAccountDto,
      userId
    );

    return wallet
  }

  @Post('transfer-to-user')
  @HttpCode(HttpStatus.OK)
  async transferToUserByPhone(
    @Req() req: Request,
    @Body()
    transferAccountDto: TransferMoneyDto,
  ) {
    const reference = generateRef(12);
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

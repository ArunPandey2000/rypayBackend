import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/core/entities/user.entity";
import { Wallet } from "src/core/entities/wallet.entity";
import { TransactionType } from "src/transactions/enum/transaction-type.enum";

export class AddMoneyToWalletDto {
    user: User;

    walletId: string;

    wallet: Wallet;
  
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    amount: number;
  
    type: TransactionType;
  
    transactionHash: string;
  
    description: string;
  
    reference: string;
  
    walletBalanceBefore: number;
  
    walletBalanceAfter: number;
  
    transactionDate: Date;
  
    sender: string;
  
    receiver: string;
  
    receiverAccountNo: string;
  }
  
  export class TransferMoneyDto {
    user: User;
  
    wallet: Wallet;

    walletId: string;
  
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    amount: number;
  
    transactionType: string;
  
    transactionHash: string;
  
    description: string;
  
    reference: string;
  
    walletBalanceBefore: number;
  
    walletBalanceAfter: number;
  
    transactionDate: Date;
  
    sender: number;
  
    receiver: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    receiverAccountNo: string;
  }

  export class DeductWalletBalanceRechargeDto {
    amount: number;
    reference: string;
  }

  export class UpdateWalletAfterRechargeDto extends DeductWalletBalanceRechargeDto {
    user: User;
  
    wallet: Wallet;

    walletId: string;
  
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    amount: number;
  
    transactionType: string;
  
    transactionHash: string;
  
    description: string;
  
    reference: string;
  
    walletBalanceBefore: number;
  
    walletBalanceAfter: number;
  
    transactionDate: Date;
  }
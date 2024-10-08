import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { User } from "src/core/entities/user.entity";
import { TransactionType } from "../enum/transaction-type.enum";
import { TransactionStatus } from "src/core/entities/transactions.entity";

export class CreateTransactionDto {
  
    @IsNumber()
    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    user: User;
  
    @IsString()
    @IsNotEmpty()
    type: TransactionType

    @IsString()
    @IsNotEmpty()
    serviceUsed: string
  
    @IsString()
    @IsNotEmpty()
    transactionHash: string;
  
    @IsString()
    @IsNotEmpty()
    description: string;
  
    @IsString()
    @IsNotEmpty()
    reference: string;
  
    @IsNumber()
    @IsNotEmpty()
    walletBalanceBefore: number;
  
    @IsNumber()
    @IsNotEmpty()
    walletBalanceAfter: number;
  
    sender: string;
  
    receiver: string;
  
    @IsNotEmpty()
    transactionDate: Date;

    @IsNotEmpty()
    status: TransactionStatus
  }
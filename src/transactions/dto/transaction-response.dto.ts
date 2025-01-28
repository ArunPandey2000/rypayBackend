import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/core/entities/user.entity';

export class UserTransactionDto {
    @ApiProperty({ example: '1', description: 'Unique identifier for the user' })
    id: string;
  
    @ApiProperty({ example: 'John', description: 'First name of the user' })
    firstName: string;
  
    @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
    lastName: string;
  }
  
export class TransactionResponseDto {
  @ApiProperty({ example: 1, description: 'Unique identifier for the transaction' })
  id: number;

  @ApiProperty({ example: 100, description: 'Amount involved in the transaction' })
  amount: number;

  @ApiProperty({ example: 50, description: 'Wallet balance before the transaction' })
  walletBalanceBefore: number;

  @ApiProperty({ example: 150, description: 'Wallet balance after the transaction' })
  walletBalanceAfter: number;

  @ApiProperty({ example: 'John Doe', description: 'Sender of the transaction' })
  sender: string;

  @ApiProperty({ example: 'Jane Doe', description: 'Receiver of the transaction' })
  receiver: string;

  @ApiProperty({ example: 'REF123456', description: 'Reference code for the transaction' })
  reference: string;

  @ApiProperty({ example: 'Payment for services', description: 'Description of the transaction' })
  description: string;

  @ApiProperty({ example: '0xabc123...', description: 'Hash of the transaction' })
  transactionHash: string;

  @ApiProperty({ example: 'WALLET_TRANSFER', description: 'Type of transaction' })
  transactionType: string;

  @ApiProperty({ example: '2023-08-29T12:34:56Z', description: 'Date of the transaction' })
  transactionDate: Date;

  @ApiProperty({ example: '2023-08-29T12:34:56Z', description: 'Creation date of the transaction' })
  createdAt: Date;

  @ApiProperty({ example: 'WALLET', description: 'Service used for the transaction' })
  serviceUsed: string;

  @ApiProperty({ example: '2023-08-29T12:34:56Z', description: 'Last update date of the transaction' })
  updatedAt: Date;

  @ApiProperty({ type: () => UserTransactionDto, nullable: true, description: 'Details of the user involved in the transaction (in case of wallet)' })
  counterPartyUser: UserTransactionDto | null;

  @ApiProperty({ type: () => User, nullable: true, description: 'Details of the user' })
  user?: UserTransactionDto | null;
}



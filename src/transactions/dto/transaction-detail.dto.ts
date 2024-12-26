import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "src/core/entities/transactions.entity";
import { User } from "src/core/entities/user.entity";

class TransactionUser {
    name: string;
    phoneNumber: string;

    constructor(user: User) {
        this.name = `${user.firstName} ${user.lastName}`;
        this.phoneNumber = user.phoneNumber;
    }
}
export class TransactionDetailDto {
    @ApiProperty()
    amount: number;
    @ApiProperty()
    walletBalanceBefore: number;
    @ApiProperty()
    walletBalanceAfter: number;
    @ApiProperty()
    accountNumber: string | null;
    @ApiProperty()
    sender: TransactionUser;
    @ApiProperty()
    receiver: TransactionUser;
    @ApiProperty()
    reference: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    transactionHash: string;
    @ApiProperty()
    transactionType: string;
    @ApiProperty()
    transactionDate: Date;
    @ApiProperty()
    createdAt: Date;
    @ApiProperty()
    serviceUsed: string;
    @ApiProperty()
    updatedAt: Date;

    constructor(transaction: Transaction, senderUser: User, receiver: User) {
        this.amount = transaction.amount;
        this.walletBalanceBefore = transaction.walletBalanceBefore;
        this.walletBalanceAfter = transaction.walletBalanceAfter;
        this.sender = senderUser ? new TransactionUser(senderUser) : null;
        this.receiver = receiver ? new TransactionUser(receiver): null;
        this.reference = transaction.reference;
        this.description = transaction.description;
        this.transactionHash =transaction.transactionHash;
        this.transactionType = transaction.type;
        this.transactionDate = transaction.transactionDate;
        this.createdAt = transaction.createdAt;
        this.serviceUsed = transaction.serviceUsed;
        this.updatedAt = transaction.updatedAt;
        this.accountNumber = transaction.receiver;
    }
}
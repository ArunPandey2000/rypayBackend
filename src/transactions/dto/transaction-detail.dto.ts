import { ApiProperty } from "@nestjs/swagger";
import { Transaction } from "src/core/entities/transactions.entity";
import { User } from "src/core/entities/user.entity";

class TransactionUser {
    @ApiProperty()
    name: string;
    @ApiProperty()
    phoneNumber: string;

    constructor(user: User) {
        this.name = `${user.firstName} ${user.lastName}`;
        this.phoneNumber = user.phoneNumber;
    }
}
export class AccountDetails {
    @ApiProperty()
    accountNumber: string
    @ApiProperty()
    userName: string
    @ApiProperty()
    ifscNumber: string
    @ApiProperty()
    paymentMode: string
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
    @ApiProperty()
    accountDetails: AccountDetails

    constructor(transaction: Transaction, senderUser: User, receiver: User, accountDetails: AccountDetails) {
        this.amount = transaction.amount;
        this.walletBalanceBefore = transaction.walletBalanceBefore;
        this.walletBalanceAfter = transaction.walletBalanceAfter;
        this.sender = senderUser ? new TransactionUser(senderUser) : null;
        this.receiver = receiver ? new TransactionUser(receiver): null;
        this.reference = transaction.reference;
        this.description = transaction.description;
        this.transactionHash =transaction.transactionHash;
        this.transactionType = transaction.type;
        this.transactionDate = transaction.createdAt;
        this.createdAt = transaction.createdAt;
        this.serviceUsed = transaction.serviceUsed;
        this.updatedAt = transaction.updatedAt;
        this.accountNumber = transaction.receiver;
        this.accountDetails = accountDetails;
    }
}
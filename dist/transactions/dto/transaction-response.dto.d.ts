export declare class UserTransactionDto {
    id: string;
    firstName: string;
    lastName: string;
}
export declare class TransactionResponseDto {
    id: number;
    amount: number;
    walletBalanceBefore: number;
    walletBalanceAfter: number;
    sender: string;
    receiver: string;
    reference: string;
    description: string;
    transactionHash: string;
    transactionType: string;
    transactionDate: Date;
    createdAt: Date;
    serviceUsed: string;
    updatedAt: Date;
    counterPartyUser: UserTransactionDto | null;
}

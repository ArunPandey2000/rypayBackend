export declare function createTransactionMessage({ transactionType, amount, bankName, accountNumber, contact }: {
    transactionType: any;
    amount: any;
    bankName: any;
    accountNumber: any;
    contact: any;
}): string;
export declare function createStaticQRMessage({ payeeName, amount, payeeUPIId }: {
    payeeName: any;
    amount: any;
    payeeUPIId: any;
}): string;

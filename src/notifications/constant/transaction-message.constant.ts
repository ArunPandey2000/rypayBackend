import { TransactionType } from "src/transactions/enum/transaction-type.enum";

export function createTransactionMessage({ transactionType, amount, bankName, accountNumber, contact }) {
    const transactionDirection = transactionType === TransactionType.CREDIT ? 'Received' : 'Sent';
    const preposition = transactionDirection === 'Received' ? 'in your' : 'from your';
    return `${transactionDirection} <b>Rs. ${amount}</b> ${preposition} <b>${bankName}</b> Bank AC <b>XXX${accountNumber}</b> ${transactionDirection === 'Received' ? 'from' : 'to'} <b>${contact}</b>`;
}

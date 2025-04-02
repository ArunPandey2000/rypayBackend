"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransactionMessage = createTransactionMessage;
exports.createStaticQRMessage = createStaticQRMessage;
const transaction_type_enum_1 = require("../../transactions/enum/transaction-type.enum");
function createTransactionMessage({ transactionType, amount, bankName, accountNumber, contact }) {
    const transactionDirection = transactionType === transaction_type_enum_1.TransactionType.CREDIT ? 'Received' : 'Sent';
    contact = contact ?? bankName;
    const preposition = transactionDirection === 'Received' ? 'in your' : 'from your';
    return `${transactionDirection} <b>Rs. ${amount}</b> ${preposition} <b>${bankName}</b> Bank AC <b>XXX${accountNumber}</b> ${transactionDirection === 'Received' ? 'from' : 'to'} <b>${contact}</b>`;
}
function createStaticQRMessage({ payeeName, amount, payeeUPIId }) {
    return `You have received a payment of Rs. ${amount} from ${payeeName} (UPI: ${payeeUPIId})`;
}
//# sourceMappingURL=transaction-message.constant.js.map
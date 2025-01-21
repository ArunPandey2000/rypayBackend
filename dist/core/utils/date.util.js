"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateToIST = formatDateToIST;
exports.formatAmountToINR = formatAmountToINR;
function formatDateToIST(date, includeTime = true) {
    const options = {
        timeZone: 'Asia/Kolkata',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        ...(includeTime ? { hour: '2-digit',
            minute: '2-digit' } : {}),
        hour12: false
    };
    const formatter = new Intl.DateTimeFormat('en-In', options);
    return formatter.format(date);
}
function formatAmountToINR(amount) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}
//# sourceMappingURL=date.util.js.map
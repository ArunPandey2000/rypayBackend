"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = exports.generateRef = void 0;
exports.sanitizeDateString = sanitizeDateString;
exports.maskAccount = maskAccount;
const generateRef = (length) => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }
    return result;
};
exports.generateRef = generateRef;
function sanitizeDateString(date) {
    const dateString = date.replace(/"/g, '');
    return dateString;
}
function maskAccount(account) {
    const visibleDigits = 4;
    const maskedPart = '*'.repeat(account.length - visibleDigits);
    return maskedPart + account.slice(-visibleDigits);
}
const generateHash = () => {
    const key = `RYPAY_TX_REF${(0, exports.generateRef)(12)}`.toUpperCase();
    return key;
};
exports.generateHash = generateHash;
//# sourceMappingURL=hash.util.js.map
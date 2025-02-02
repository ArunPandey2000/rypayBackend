"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateReferralCode = exports.generateHash = exports.generateRef = void 0;
exports.sanitizeDateString = sanitizeDateString;
exports.maskAccount = maskAccount;
const uuid = require("uuid");
const random_util_1 = require("./random-util");
const generateRef = (length) => {
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    return (0, random_util_1.customAlphabet)(characters, length)();
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
const generateReferralCode = (userId) => {
    return `RYPAY_USER${userId}-${uuid.v4().slice(0, 8)}`;
};
exports.generateReferralCode = generateReferralCode;
//# sourceMappingURL=hash.util.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getIMPSCharges = getIMPSCharges;
function getIMPSCharges(amount) {
    if (amount <= 0) {
        throw new Error("Amount must be greater than 0");
    }
    if (amount >= 0 && amount <= 1000) {
        return 3.7;
    }
    else if (amount >= 1001 && amount <= 10000) {
        return 8.0;
    }
    else if (amount >= 10001 && amount <= 25000) {
        return 13.0;
    }
    else if (amount > 25000) {
        return 16.5;
    }
    else {
        throw new Error("Invalid amount");
    }
}
//# sourceMappingURL=payment.utils.js.map
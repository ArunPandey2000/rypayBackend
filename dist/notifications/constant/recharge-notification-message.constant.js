"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRechargeMessage = createRechargeMessage;
function createRechargeMessage({ amount, rechargeNumber, rechargeStatus, rechargeType }) {
    let message = '';
    switch (rechargeStatus) {
        case 'SUCCESS':
            message = `Your <b>${rechargeType}</b> recharge of <b>${amount}Rs.</b> for <b>${rechargeNumber}</b> was successful!`;
            break;
        case 'PENDING':
            message = `Your <b>${rechargeType}</b> recharge of <b>${amount}</b> for <b>${rechargeNumber}</b> is currently pending. We’ll notify you once it’s completed.`;
            break;
        case 'FAILED':
            message = `Your <b>${rechargeType}</b> recharge attempt of <b>${amount}</b> for <b>${rechargeNumber}</b> failed. Please try again or contact support if the issue persists.`;
            break;
        default:
            message = `We have an update on your <b>${rechargeType}</b> recharge of <b>${amount}</b> for <b>${rechargeNumber}</b>.`;
    }
    return message;
}
//# sourceMappingURL=recharge-notification-message.constant.js.map
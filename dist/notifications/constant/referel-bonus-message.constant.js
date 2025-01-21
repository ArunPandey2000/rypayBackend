"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createReferrelMessage = createReferrelMessage;
function createReferrelMessage(isReferrer, amount, counterUserName) {
    return isReferrer ? referrerBonusMessage(amount, counterUserName) : refreeBonusMessage(amount, counterUserName);
}
const referrerBonusMessage = (amount, refreeName) => `You’ve just earned Rs.${amount} for inviting ${refreeName} to join RYPAY!
Keep sharing your referral link to earn even more rewards! 🚀`;
const refreeBonusMessage = (amount, referrerName) => `Welcome to RyPay! 🎉

You’ve unlocked a Rs.${amount} welcome bonus thanks to ${referrerName}!
Use it toward your first purchase or service.`;
//# sourceMappingURL=referel-bonus-message.constant.js.map

export function createReferrelMessage(isReferrer: boolean, amount: number, counterUserName: string) {
    return isReferrer ? referrerBonusMessage(amount, counterUserName) : refreeBonusMessage(amount, counterUserName);
}

const referrerBonusMessage = (amount: number, refreeName: string) => `You’ve just earned Rs.${amount} for inviting ${refreeName} to join RYPAY!
Keep sharing your referral link to earn even more rewards! 🚀`;

const refreeBonusMessage = (amount, referrerName) => `Welcome to RyPay! 🎉

You’ve unlocked a Rs.${amount} welcome bonus thanks to ${referrerName}!
Use it toward your first purchase or service.`
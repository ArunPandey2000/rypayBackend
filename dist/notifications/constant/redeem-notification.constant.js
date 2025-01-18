"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coinExpiredNotification = exports.redeemNotifcation = void 0;
const redeemNotifcation = (coins, amount) => `Congratulations! You have successfully redeemed ${Math.abs(coins)} RyCoins for ₹${amount}.`;
exports.redeemNotifcation = redeemNotifcation;
const coinExpiredNotification = (coins) => `Your ${coins} RyCoins have expired. Stay active and redeem your coins on time to avoid losing them next time!`;
exports.coinExpiredNotification = coinExpiredNotification;
//# sourceMappingURL=redeem-notification.constant.js.map
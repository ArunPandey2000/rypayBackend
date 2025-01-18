export const redeemNotifcation = (coins: number, amount: number) => `Congratulations! You have successfully redeemed ${Math.abs(coins)} RyCoins for ₹${amount}.`;

export const coinExpiredNotification = (coins: number) => 
    `Your ${coins} RyCoins have expired. Stay active and redeem your coins on time to avoid losing them next time!`;
  
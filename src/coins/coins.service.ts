import { BadRequestException, ForbiddenException, forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CoinTransaction } from "src/core/entities/coins.entity";
import { Between, IsNull, MoreThan, Not, Repository } from "typeorm";
import { CoinsDto, RedemptionRuleDto } from "./dto/redemption-rules.dto";
import { User } from "src/core/entities/user.entity";
import { RedemptionRule } from "src/core/entities/redemption-rules.entity";
import { WalletBridge } from "src/wallet/services/wallet.queue";

@Injectable()
export class CoinTransactionService {
  constructor(
    @InjectRepository(CoinTransaction)
    private readonly coinTransactionRepository: Repository<CoinTransaction>,
    @InjectRepository(RedemptionRule)
    private readonly redemptionRuleRepository: Repository<RedemptionRule>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private walletBridge: WalletBridge,
  ) {}


  async addCoins(userId: string, coinAmount: number, mainWalletTransactionId: string): Promise<void> {
    const user = await this.userRepository.findOneBy({id: userId});
    if (!user) {
        throw new ForbiddenException('user does not have enough permission');
    }
    const coinTransaction = this.coinTransactionRepository.create({
      user: { id: userId },
      coinAmount,
      mainWalletTransactionId,
    });
    await this.coinTransactionRepository.save(coinTransaction);
  }

  // Get total coins for a user, considering expiration logic
  private async getTotalUnexpiredCoins(userId: string): Promise<number> {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
  
    const unexpiredCoins = await this.coinTransactionRepository.find({
      where: {
        user: { id: userId },
        isExpired: false,
        created_at: Between(twelveMonthsAgo, currentDate),
        coinAmount: MoreThan(0), // Exclude transactions with redemption and empty
      },
    });
  
    return unexpiredCoins.reduce((sum, txn) => sum + (Number.parseFloat(txn.coinAmount?.toString()) || 0), 0);
  }
  

  // Get all transactions for a user
  async getTransactions(userId: string): Promise<CoinTransaction[]> {
    return this.coinTransactionRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }


  private async validateYearRedemption(userId: string) {
    const currentDate = new Date();
    const yearStart = new Date(currentDate.getFullYear(), 0, 1);
    const yearEnd = new Date(currentDate.getFullYear(), 11, 31);
  
    const yearRedemptions = await this.coinTransactionRepository.find({
      where: {
        user: { id: userId },
        redemptionValue: Not(IsNull()),
        created_at: Between(yearStart, yearEnd),
      },
    });
  
    const totalYearRedemption = yearRedemptions.reduce((sum, txn) => sum + (Number.parseFloat(txn.redemptionValue?.toString()) || 0), 0);
  
    if (totalYearRedemption >= 1200) {
      throw new BadRequestException('You have reached the annual redemption limit of ₹1,200.');
    }
  }
  private async validateMonthlyRedemption(userId: string) {
    const currentDate = new Date();
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  
    const monthRedemptions = await this.coinTransactionRepository.find({
      where: {
        user: { id: userId },
        redemptionValue: Not(IsNull()),
        created_at: Between(monthStart, monthEnd),
      },
    });
  
    const totalMonthRedemption = monthRedemptions.reduce((sum, txn) => sum + (Number.parseFloat(txn.redemptionValue?.toString()) || 0), 0);
  
    if (totalMonthRedemption >= 1000) {
      throw new BadRequestException('You have reached the monthly redemption limit of ₹100.');
    }
  }

  async getCoins(userId: string) {
    const totalUnExpiredCoins = await this.getTotalUnexpiredCoins(userId);
    const redeemedEntries = await this.coinTransactionRepository.find({
        where: {
          user: { id: userId },
          redemptionValue: Not(IsNull()),
        },
    });
    const totalRedeemAmount = redeemedEntries.reduce((sum, txn) => sum + (Number.parseFloat(txn.redemptionValue?.toString()) || 0), 0);
    return <CoinsDto>{
        amountRedeemed: totalRedeemAmount,
        availableCoins: totalUnExpiredCoins
    }
  }

  async redeemCoins(userId: string, redemptionId: string): Promise<{ message: string; redemptionValue: number }> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new ForbiddenException('User does not have enough permission');
    }
  
    // Validate annual and monthly redemption limits
    await this.validateYearRedemption(userId);
    await this.validateMonthlyRedemption(userId);
  
    // Fetch redemption rule
    const redemptionRule = await this.redemptionRuleRepository.findOne({ where: { id: redemptionId } });
    if (!redemptionRule) {
      throw new NotFoundException('Invalid redemption option.');
    }
  
    // Get unexpired coins
    const totalCoins = await this.getTotalUnexpiredCoins(userId);
  
    // Check if the user has enough unexpired coins
    if (totalCoins < Number.parseFloat(redemptionRule.requiredCoins?.toString())) {
      throw new BadRequestException('Insufficient unexpired coins for this redemption.');
    }
  
    // Deduct coins from the oldest unexpired entries (FIFO)
    await this.deductCoins(userId, Number.parseFloat(redemptionRule.requiredCoins?.toString()));
  
    // Create a redemption transaction
    const coinTransaction = this.coinTransactionRepository.create({
      user: user,
      coinAmount: -(Number.parseFloat(redemptionRule.requiredCoins?.toString())),
      redemptionValue: Number.parseFloat(redemptionRule.redemptionValue?.toString()),
    });
  
    await this.coinTransactionRepository.save(coinTransaction);
  
    // Notify the wallet bridge
    await this.walletBridge.add('redeem', {
      ...coinTransaction,
      redemptionValue: Number.parseFloat(coinTransaction.redemptionValue?.toString()),
    });
  
    return {
      message: `Successfully redeemed ${redemptionRule.requiredCoins} RyCoins for ₹${redemptionRule.redemptionValue}.`,
      redemptionValue: redemptionRule.redemptionValue,
    };
  }


  private async deductCoins(userId: string, requiredCoins: number): Promise<void> {
    const currentDate = new Date();
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
  
    // Fetch unexpired transactions sorted by creation date
    const unexpiredEntries = await this.coinTransactionRepository.find({
      where: {
        user: { id: userId },
        isExpired: false,
        created_at: Between(twelveMonthsAgo, currentDate),
        coinAmount: MoreThan(0), // Exclude already-redeemed entries
      },
      order: { created_at: 'ASC' },
    });
  
    let remainingCoins = requiredCoins;
  
    for (const entry of unexpiredEntries) {
      if (remainingCoins <= 0) break;
      const coinAmount = Number.parseFloat(entry.coinAmount?.toString())
      if (coinAmount <= remainingCoins) {
        // Deduct the full entry amount and mark it as redeemed
        remainingCoins -= coinAmount;
        entry.coinAmount = 0;
      } else {
        // Deduct a partial amount and update the entry
        entry.coinAmount -= remainingCoins;
        remainingCoins = 0;
      }
  
      await this.coinTransactionRepository.save(entry);
    }
  
    if (remainingCoins > 0) {
      throw new BadRequestException('Insufficient unexpired coins to redeem.');
    }
  }
  
  

  async getRedemptionRules(): Promise<RedemptionRuleDto[]> {
    return this.redemptionRuleRepository.find({ order: { requiredCoins: 'ASC' } });
  }
}

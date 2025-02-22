import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from 'src/core/entities/plans.entity';
import { Subscription } from 'src/core/entities/subscriptions.entity';
import { Transaction } from 'src/core/entities/transactions.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { Repository } from 'typeorm';
import { PlanResponseDto } from './dto/plan-response.dto';

@Injectable()
export class SubscriptionsService {
    constructor(
      @InjectRepository(Subscription) private subscriptionRepository: Repository<Subscription>,
      @InjectRepository(Plan) private planRepository: Repository<Plan>,
      @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
      @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    ) {}
  

    async findAllWithLimits(): Promise<PlanResponseDto[]> {
        const plans = await this.planRepository.find({
          relations: ['limits'],
        });
        return plans.map((plan) => new PlanResponseDto(plan));
      }
    
      async findOneWithLimits(id: string): Promise<PlanResponseDto> {
        const plan = await this.planRepository.findOne({
          where: { id },
          relations: ['limits'],
        });
    
        if (!plan) {
          throw new NotFoundException(`Plan with ID ${id} not found.`);
        }
    
        return new PlanResponseDto(plan);
    }

    async calculateUpgradeCost(userId: string, newPlanId: string) {
      const currentSubscription = await this.subscriptionRepository.findOne({
        where: { user_id: userId, is_current: true, status: 'Active' },
      });
      let currenPlanId = '6248880a-180b-4b96-a9fc-5a5f4ead4871';
      if (currentSubscription) {
        currenPlanId = currentSubscription.id;
      }
  
      const currentPlan = await this.planRepository.findOne({where: {
        id: currenPlanId
      }});

      const newPlan = await this.planRepository.findOne({
        where: {
            id: newPlanId
        }
      });
      if (!newPlan) throw new Error('Invalid plan.');
  
      const wallet = await this.walletRepository.findOne({ where: { user: {
        id: userId
      } } });
      if (!wallet) throw new Error('Wallet not found.');

      let refundAmount = 0;
      if (currentSubscription) {
        const today = new Date();
        const remainingDays =
            (new Date(currentSubscription.end_date).getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
        refundAmount = (currentPlan.price / currentPlan.duration) * remainingDays;
      }
      const adjustedAmountToPay = Math.max(newPlan.price - refundAmount, 0);
  
      return {
        currentPlanId: currenPlanId,
        currentPlan: currentPlan.name,
        newPlan: newPlan.name,
        newPlanId: newPlanId,
        refundAmount: parseFloat(refundAmount.toFixed(2)),
        newPlanCost: newPlan.price,
        adjustedAmountToPay: parseFloat(adjustedAmountToPay.toFixed(2)),
        walletBalance: parseFloat(wallet.balance.toFixed(2)),
        amountToPayFromWallet: adjustedAmountToPay,
      };
    }
  
    async upgradePlan(userId: string, newPlanId: string) {
      const costDetails = await this.calculateUpgradeCost(userId, newPlanId);
      const { adjustedAmountToPay, amountToPayFromWallet } = costDetails;
  
      const wallet = await this.walletRepository.findOne({ where: { user: {id: userId} } });
      if (adjustedAmountToPay > wallet.balance) {
        throw new Error('Insufficient wallet balance. Please add funds to your wallet.');
      }
  
      wallet.balance -= amountToPayFromWallet;
      await this.walletRepository.save(wallet);
  
    //   await this.transactionRepository.save({
    //     user_id: userId,
    //     amount: amountToPayFromWallet,
    //     type: 'DEBIT',
    //     description: `Plan upgrade to ${costDetails.newPlan}`,
    //     created_at: new Date(),
    //   });
  
      const newPlan = await this.planRepository.findOne({where: {id: newPlanId}});
      const today = new Date();
      const newEndDate = new Date(today.setDate(today.getDate() + newPlan.duration));
  
      await this.subscriptionRepository.update(
        { id: costDetails.currentPlanId },
        { status: 'Expired', is_current: false },
      );
  
      await this.subscriptionRepository.save({
        user_id: userId,
        plan_id: newPlanId,
        start_date: new Date(),
        end_date: newEndDate,
        status: 'Active',
        is_current: true,
      });
  
      return {
        message: 'Plan upgraded successfully.',
        newPlan: newPlan.name,
        amountDeducted: amountToPayFromWallet,
        remainingWalletBalance: wallet.balance,
      };
    }
  }

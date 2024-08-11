import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { DataSource, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { TransactionType } from 'src/transactions/enum/transaction-type.enum';
import { generateHash } from 'src/core/utils/hash.util';
import { ServiceTypes } from 'src/core/constants/service-types.constant';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { AddMoneyToWalletDto, DeductWalletBalanceRechargeDto, TransferMoneyDto, UpdateWalletAfterRechargeDto } from '../dto/transfer-money.dto';
import { CreateTransactionDto } from 'src/transactions/dto/create-transaction.dto';
import { Transaction, TransactionStatus } from 'src/core/entities/transactions.entity';
import { Order, OrderStatus } from 'src/core/entities/order.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
    private _connection: DataSource,
    private readonly transactionsService: TransactionsService,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Transaction) private transactionRepo: Repository<Transaction>,
  ) {}

  private async handleTransaction<T>(
    action: (queryRunner: QueryRunner) => Promise<T>,
  ): Promise<T> {
    const queryRunner = this._connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const result = await action(queryRunner);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async findUserById(userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  private async findWalletByUserId(userId: string) {
    const wallet = await this.walletRepository.findOneBy({ user: { id: userId } });
    if (!wallet) {
      throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
    }
    return wallet;
  }

  private async updateWalletBalance(
    wallet: Wallet,
    amount: number,
    queryRunner: QueryRunner,
    isCredit: boolean,
  ) {
    wallet.balance += isCredit ? amount : -amount;
    wallet.updatedAt = new Date();
    return queryRunner.manager.save(wallet);
  }

  async createWallet(createWalletDto: CreateWalletDto, queryRunner: QueryRunner) {
    const wallet = this.walletRepository.create(createWalletDto);
    return queryRunner.manager.save(wallet);
  }

  async getOne(query: FindOptionsWhere<Wallet>): Promise<Wallet> {
    return this.walletRepository.findOneBy(query);
  }

  async getWallet(query: FindOptionsWhere<Wallet>) {
    const wallet = await this.walletRepository.findOneBy(query);
    const { user, createdAt, updatedAt, ...walletData } = wallet;
    return {
      ...walletData,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };
  }

  async generateWalletAccountNo(): Promise<string> {
    const walletAccountNo = Math.floor(1000000000 + Math.random() * 9000000000).toString();
    const existingWallet = await this.getOne({ walletAccountNo });
    return existingWallet ? this.generateWalletAccountNo() : walletAccountNo;
  }

  async AddMoneyToWallet(addMoneyWalletDto: AddMoneyToWalletDto, req: any): Promise<Wallet> {
    const userId = req.user.sub;
    return this.handleTransaction(async (queryRunner) => {
      const user = await this.findUserById(userId);
      const wallet = await this.findWalletByUserId(userId);

      const transaction = <CreateTransactionDto>{
        ...addMoneyWalletDto,
        user,
        type: TransactionType.CREDIT,
        amount: Number(addMoneyWalletDto.amount),
        description: `INR${addMoneyWalletDto.amount} was credited to your wallet`,
        transactionDate: new Date(),
        walletBalanceBefore: wallet.balance,
        walletBalanceAfter: wallet.balance + addMoneyWalletDto.amount,
        wallet,
        serviceUsed: ServiceTypes.Wallet,
        sender: user.id,
        status: TransactionStatus.SUCCESS,
        receiver: addMoneyWalletDto.receiver || null,
      }

      await this.updateWalletBalance(wallet, addMoneyWalletDto.amount, queryRunner, true);
      await this.transactionsService.saveTransaction(transaction, queryRunner);

      return wallet;
    });
  }

  async debitMyAccount(fundMyAccountDto: AddMoneyToWalletDto, req: any): Promise<Wallet> {
    const userId = req.user.sub;
    return this.handleTransaction(async (queryRunner) => {
      const user = await this.findUserById(userId);
      const wallet = await this.findWalletByUserId(userId);

      if (fundMyAccountDto.amount < 0) {
        throw new BadRequestException('Amount cannot be negative');
      }

      const transaction = {
        ...fundMyAccountDto,
        user,
        type: TransactionType.DEBIT,
        amount: Number(fundMyAccountDto.amount),
        description: `INR${fundMyAccountDto.amount} was debited from your wallet`,
        transactionDate: new Date(),
        walletBalanceBefore: wallet.balance,
        walletBalanceAfter: wallet.balance - fundMyAccountDto.amount,
        wallet,
        status: TransactionStatus.SUCCESS,
        sender: user.id,
        serviceUsed: ServiceTypes.Wallet,
      }

      await this.updateWalletBalance(wallet, fundMyAccountDto.amount, queryRunner, false);
      await this.transactionsService.saveTransaction(transaction, queryRunner);

      return wallet;
    });
  }

  async processFundTransfer(transferAccountDto: TransferMoneyDto, req: any): Promise<Wallet> {
    const userId = req.user.sub;
    return this.handleTransaction(async (queryRunner) => {
      const user = await this.findUserById(userId);
      const receiver = await this.userRepository.findOneBy({
        phoneNumber: transferAccountDto.receiverAccountNo,
      });
      if (!receiver) {
        throw new BadRequestException('Receiver not found');
      }

      const senderWallet = await this.findWalletByUserId(userId);
      const receiverWallet = await this.findWalletByUserId(receiver.id);

      if (transferAccountDto.amount < 0) {
        throw new BadRequestException('Amount cannot be negative');
      }
      if (transferAccountDto.amount > senderWallet.balance) {
        throw new BadRequestException('Insufficient funds');
      }

      await Promise.all([
        this.updateWalletBalance(senderWallet, transferAccountDto.amount, queryRunner, false),
        this.transactionsService.saveTransaction(
          {
            ...transferAccountDto,
            user,
            type: TransactionType.DEBIT,
            description: `INR${transferAccountDto.amount} was debited from your wallet`,
            transactionDate: new Date(),
            walletBalanceBefore: senderWallet.balance,
            walletBalanceAfter: senderWallet.balance - transferAccountDto.amount,
            sender: user.id,
            receiver: receiver.id,
            status: TransactionStatus.SUCCESS,
            serviceUsed: ServiceTypes.Wallet,
          },
          queryRunner,
        ),
        this.updateWalletBalance(receiverWallet, transferAccountDto.amount, queryRunner, true),
        this.transactionsService.saveTransaction(
          {
            ...transferAccountDto,
            user,
            type: TransactionType.CREDIT,
            description: `INR${transferAccountDto.amount}/${user.firstName} ${user.lastName}`,
            transactionDate: new Date(),
            walletBalanceBefore: receiverWallet.balance,
            walletBalanceAfter: receiverWallet.balance + transferAccountDto.amount,
            sender: user.id,
            receiver: receiver.id,
            status: TransactionStatus.SUCCESS,
            serviceUsed: ServiceTypes.Wallet,
          },
          queryRunner,
        ),
      ]);

      return senderWallet;
    });
  }

  async processRechargePayment(
    deductBalanceData: DeductWalletBalanceRechargeDto,
    userId: string,
  ): Promise<Wallet> {
    return this.handleTransaction(async (queryRunner) => {
      const user = await this.findUserById(userId);
      const wallet = await this.findWalletByUserId(userId);

      if (deductBalanceData.amount < 0) {
        throw new BadRequestException('Amount cannot be negative');
      }
      if (deductBalanceData.amount > wallet.balance) {
        throw new BadRequestException('Insufficient funds');
      }

      const rechargeDto = {
        ...deductBalanceData,
        transactionHash: generateHash(),
        user: user,
        type: TransactionType.DEBIT,
        transactionDate: new Date(),
        walletBalanceBefore: wallet.balance,
        walletBalanceAfter: wallet.balance - deductBalanceData.amount,
        wallet,
        sender: user.id,
        receiver: deductBalanceData.receiverId,
        serviceUsed: deductBalanceData.serviceUsed,
      };

      await this.updateWalletBalance(wallet, deductBalanceData.amount, queryRunner, false);
      await this.transactionsService.saveTransaction(rechargeDto, queryRunner);

      return wallet;
    });
  }

  async processRechargeRefundPayment(
    orderId: string
  ): Promise<Wallet> {
    return this.handleTransaction(async (queryRunner) => {
      const order = await this.orderRepository.findOne({where: {order_id: orderId}});
      const user = order.user;
      const wallet = await this.findWalletByUserId(user.id);
      if (!wallet) {
        throw new BadRequestException('wallet not found for user');
      }
      if (order.amount < 0) {
        throw new BadRequestException('Amount cannot be negative');
      }
      if (order.status !== OrderStatus.PENDING) {
        throw new BadRequestException('Order is not in pending state');
      }
      order.status = OrderStatus.FAILED;
      const transaction = await this.transactionRepo.findOne({where: {reference: orderId}});
      transaction.status = TransactionStatus.FAILED;
      await queryRunner.manager.save<Transaction>(transaction);
      await queryRunner.manager.save<Order>(order);
      await this.updateWalletBalance(wallet, order.amount, queryRunner, true);

      return wallet;
    });
  }

  async processRechargeSuccess(
    orderId: string, transactionId: string, gatewayId: string
  ): Promise<boolean> {
    return this.handleTransaction(async (queryRunner) => {
      const order = await this.orderRepository.findOne({where: {order_id: orderId}});

      order.status = OrderStatus.SUCCESS;
      order.gateway_response = gatewayId;
      const transaction = await this.transactionRepo.findOne({where: {reference: orderId}});
      transaction.status = TransactionStatus.SUCCESS;
      order.transaction_id = transactionId;
      await queryRunner.manager.save<Transaction>(transaction);
      await queryRunner.manager.save<Order>(order);

      return true
    });
  }
}

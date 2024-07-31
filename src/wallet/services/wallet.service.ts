import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { DataSource, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { Request } from 'express';
import { AddMoneyToWalletDto, DeductWalletBalanceRechargeDto, TransferMoneyDto, UpdateWalletAfterRechargeDto } from '../dto/transfer-money.dto';
import { TransactionType } from 'src/transactions/enum/transaction-type.enum';
import { generateHash } from 'src/core/utils/hash.util';

@Injectable()
export class WalletService {
    constructor(
        @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
        private _connection: DataSource,
        private readonly transactionsService: TransactionsService,
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    
      async createWallet(
        createWalletDto: CreateWalletDto,
        queryRunner: QueryRunner,
      ) {
        const wallet = new Wallet();
        wallet.user = createWalletDto.user;
        wallet.walletAccountNo = createWalletDto.walletAccountNo;
        this.walletRepository.create(wallet);
        return queryRunner.manager.save(wallet);
      }
    
      async getOne(query: FindOptionsWhere<Wallet>): Promise<Wallet> {
        const result = await this.walletRepository.findOneBy(query);
    
        return result;
      }
    
      async getWallet(query) {
        const result = await this.walletRepository.findOneBy(query);
    
        const { user, createdAt, updatedAt, ...wallet } = result;
    
        let userDetails = {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        };
    
        return { ...wallet, ...userDetails };
      }
    
      async generateWalletAccountNo(): Promise<string> {
        const walletAccountNo = Math.floor(1000000000 + Math.random() * 9000000000);
    
        const checkIfExist = await this.getOne({
          walletAccountNo: String(walletAccountNo),
        });
    
        return checkIfExist
          ? await this.generateWalletAccountNo()
          : String(walletAccountNo);
      }
    
      async creditWallet(
        wallet: Wallet,
        amount: number,
        queryRunner: QueryRunner,
      ): Promise<Wallet> {
        wallet.balance += amount;
        wallet.updatedAt = new Date();
    
        return queryRunner.manager.save(wallet);
      }
    
      async debitWallet(
        wallet: Wallet,
        amount: number,
        queryRunner: QueryRunner,
      ): Promise<Wallet> {
    
        wallet.updatedAt = new Date();
        wallet.balance -= amount;
    
        return queryRunner.manager.save(wallet);
      }
    
      async AddMoneyToWallet(
        addMoneyWalletDto: AddMoneyToWalletDto,
        req: any
      ): Promise<Wallet> {
    
        const queryRunner = this._connection.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        const user = await this.userRepository.findOneBy({
          id: req.user.sub
        });
    
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        const getWallet = await this.getOne({
          user: { id: req.user.sub },
        });
    
        if (!getWallet) {
          throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
        }
    
        addMoneyWalletDto.user = user;
        addMoneyWalletDto.type = TransactionType.CREDIT;
        addMoneyWalletDto.amount = Number(addMoneyWalletDto.amount);
        addMoneyWalletDto.description = `INR${addMoneyWalletDto.amount} was credited to your wallet`;
        addMoneyWalletDto.transactionDate = new Date();
        addMoneyWalletDto.walletBalanceBefore = Number(getWallet.balance);
        addMoneyWalletDto.walletBalanceAfter =
          getWallet.balance + addMoneyWalletDto.amount;
        addMoneyWalletDto.wallet = getWallet;
        addMoneyWalletDto.sender = user.id;
        addMoneyWalletDto.receiver =
          addMoneyWalletDto.receiver !== null ? addMoneyWalletDto.receiver : null;
        const creditWallet = await this.creditWallet(
          addMoneyWalletDto.wallet,
          addMoneyWalletDto.amount,
          queryRunner,
        );
    
        if (!creditWallet) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new HttpException(
            'Wallet cannot be credited',
            HttpStatus.BAD_REQUEST,
            { cause: new Error() },
          );
        }

        const transaction = await this.transactionsService.saveTransaction(
          addMoneyWalletDto,
          queryRunner,
        );
    
        if (!transaction) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new HttpException(
            'Transaction cannot be saved',
            HttpStatus.BAD_REQUEST,
            { cause: new Error() },
          );
        }
    
        await queryRunner.commitTransaction();
    
        return getWallet;
      }
    
      async debitMyAccount(
        fundMyAccountDto: AddMoneyToWalletDto,
        req: any,
      ): Promise<Wallet> {
    
        const queryRunner = this._connection.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        const user = await this.userRepository.findOneBy({
          id: req.user.sub
        });
    
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        const getWallet = await this.getOne({
          id: req.user.sub,
        });
    
        if (!getWallet) {
          throw new BadRequestException('Wallet not found');
        }
    
        if (Math.sign(fundMyAccountDto.amount) === -1) {
          throw new BadRequestException('Amount cannot be negative');
        }
    
        fundMyAccountDto.user = user;
        fundMyAccountDto.type = TransactionType.CREDIT;
        fundMyAccountDto.amount = Number(fundMyAccountDto.amount);
        fundMyAccountDto.description = `INR${fundMyAccountDto.amount} was debited from your wallet`;
        fundMyAccountDto.transactionDate = new Date();
        fundMyAccountDto.walletBalanceBefore = Number(getWallet.balance);
        fundMyAccountDto.walletBalanceAfter =
          getWallet.balance + fundMyAccountDto.amount;
        fundMyAccountDto.wallet = getWallet;
    
        const creditWallet = await this.creditWallet(
          fundMyAccountDto.wallet,
          fundMyAccountDto.amount,
          queryRunner,
        );
    
        if (!creditWallet) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new BadRequestException('Wallet cannot be credited');
        }
    
        const transaction = await this.transactionsService.saveTransaction(
          fundMyAccountDto,
          queryRunner,
        );
    
        if (!transaction) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new BadRequestException('Transaction cannot be saved');
        }
    
        await queryRunner.commitTransaction();
    
        return getWallet;
      }
    
      async processFundTransfer(
        transferAccountDto: TransferMoneyDto,
        req: Request
      ): Promise<Wallet> {
        const userId = (req.user as any).sub;
        const queryRunner = this._connection.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        const user = await this.userRepository.findOneBy({
          id: userId
        });
    
        if (!user) {
          throw new BadRequestException('User not found');
        }
    
        const getReceiver = await this.userRepository.findOneBy({
          phoneNumber: transferAccountDto.receiverAccountNo,
        });
    
        if (!getReceiver) {
          throw new BadRequestException('Receiver not found');
        }
    
        const senderWallet = await this.getOne({
          user: { id: userId },
        });
    
        if (!senderWallet) {
          throw new BadRequestException('Sender Wallet not found');
        }
    
        const receiverWallet = await this.getOne({
          user: { id: getReceiver.id },
        });
    
        if (!receiverWallet) {
          throw new NotFoundException('Receiver Wallet not found');
        }
    
        if (Math.sign(transferAccountDto.amount) === -1) {
          throw new BadRequestException('Amount cannot be negative');
        }
    
        if (transferAccountDto.amount > senderWallet.balance) {
          throw new BadRequestException('Insufficient funds');
        }
    
        const result = await Promise.all([
          // Perform debit operation
          await this.debitWallet(
            senderWallet,
            transferAccountDto.amount,
            queryRunner,
          ),
    
          await this.transactionsService.saveTransaction(
            
            Object.assign(transferAccountDto, {
              user,
              type: TransactionType.DEBIT,
              amount: Number(transferAccountDto.amount),
              description: `INR${transferAccountDto.amount} was debited from your wallet`,
              transactionDate: new Date(),
              walletBalanceBefore: Number(senderWallet.balance),
              walletBalanceAfter: senderWallet.balance + transferAccountDto.amount,
              wallet: senderWallet,
              wallerId: senderWallet.id,
              sender: user.id,
              receiver: getReceiver.id,
            }),
            queryRunner,
          ),
    
          // Perform credit operation
          await this.creditWallet(
            receiverWallet,
            transferAccountDto.amount,
            queryRunner,
          ),
    
          // Save credit transaction
          await this.transactionsService.saveTransaction(
            // Update fundMyAccountDto for credit
            Object.assign(transferAccountDto, {
              user,
              type: TransactionType.CREDIT,
              amount: Number(transferAccountDto.amount),
              description: `INR${transferAccountDto.amount} was credited to your wallet.`,
              transactionDate: new Date(),
              walletBalanceBefore: Number(receiverWallet.balance),
              walletBalanceAfter: receiverWallet.balance + transferAccountDto.amount,
              wallet: receiverWallet,
              walletId: receiverWallet.id,
              sender: user.id,
              receiver: getReceiver.id,
            }),
            queryRunner,
          ),
        ]);
    
        const filterResult = result.filter((item) => item === undefined);
    
        if (filterResult.length > 0) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new HttpException(
            'Something happened while processing your transaction',
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: new Error() },
          );
        }
    
        await queryRunner.commitTransaction();
    
        return senderWallet;
      }
    

      async processRechargePayment(
        deductBalanceData: DeductWalletBalanceRechargeDto,
        userId: string
      ): Promise<Wallet> {
        const rechargeDto = new UpdateWalletAfterRechargeDto();
        rechargeDto.amount = deductBalanceData.amount;
        rechargeDto.reference = deductBalanceData.reference;
        rechargeDto.transactionHash = generateHash();
        
        const queryRunner = this._connection.createQueryRunner();
    
        await queryRunner.connect();
        await queryRunner.startTransaction();
    
        const user = await this.userRepository.findOneBy({
          id: userId
        });
    
        if (!user) {
          throw new BadRequestException('User not found');
        }
    
    
        const userWallet = await this.getOne({
          user: { id: userId },
        });
    
        if (!userWallet) {
          throw new BadRequestException('User Wallet not found');
        }
    
        if (Math.sign(rechargeDto.amount) === -1) {
          throw new BadRequestException('Amount cannot be negative');
        }
    
        if (rechargeDto.amount > userWallet.balance) {
          throw new BadRequestException('Insufficient funds');
        }
    
        const result = await Promise.all([
          // Perform debit operation
          await this.debitWallet(
            userWallet,
            rechargeDto.amount,
            queryRunner,
          ),
    
          await this.transactionsService.saveTransaction(
            
            Object.assign(rechargeDto, {
              user,
              type: TransactionType.DEBIT,
              amount: Number(rechargeDto.amount),
              description: `INR${rechargeDto.amount} was debited from your wallet`,
              transactionDate: new Date(),
              walletBalanceBefore: Number(userWallet.balance),
              walletBalanceAfter: userWallet.balance + rechargeDto.amount,
              wallet: userWallet,
              wallerId: userWallet.id,
              senderId: userId,
              sender: userId,
              receiver: null
            }),
            queryRunner,
          )
        ]);
    
        const filterResult = result.filter((item) => item === undefined);
    
        if (filterResult.length > 0) {
          await queryRunner.rollbackTransaction();
    
          await queryRunner.release();
    
          throw new HttpException(
            'Something happened while processing your transaction',
            HttpStatus.INTERNAL_SERVER_ERROR,
            { cause: new Error() },
          );
        }
    
        await queryRunner.commitTransaction();
    
        return userWallet;
      }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/core/entities/user.entity';
import { Wallet } from 'src/core/entities/wallet.entity';
import { TransactionsService } from 'src/transactions/services/transactions.service';
import { DataSource, FindOptionsWhere, QueryRunner, Repository } from 'typeorm';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { Request } from 'express';
import { AddMoneyToWalletDto, TransferMoneyDto } from '../dto/transfer-money.dto';
import { TransactionType } from 'src/transactions/enum/transaction-type.enum';

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
    
      async fundMyAccount(
        fundMyAccountDto: AddMoneyToWalletDto,
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
    
        fundMyAccountDto.user = user;
        fundMyAccountDto.type = TransactionType.CREDIT;
        fundMyAccountDto.amount = Number(fundMyAccountDto.amount);
        fundMyAccountDto.description = `₦${fundMyAccountDto.amount} was credited to your wallet`;
        fundMyAccountDto.transactionDate = new Date();
        fundMyAccountDto.walletBalanceBefore = Number(getWallet.balance);
        fundMyAccountDto.walletBalanceAfter =
          getWallet.balance + fundMyAccountDto.amount;
        fundMyAccountDto.wallet = getWallet;
        fundMyAccountDto.sender = user.id;
        fundMyAccountDto.receiver =
          fundMyAccountDto.receiver !== null ? fundMyAccountDto.receiver : null;
        const creditWallet = await this.creditWallet(
          fundMyAccountDto.wallet,
          fundMyAccountDto.amount,
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

        // fundMyAccountDto.walletId = wallet.id.toString();
        const transaction = await this.transactionsService.saveTransaction(
          fundMyAccountDto,
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
          throw new HttpException('Wallet not found', HttpStatus.NOT_FOUND);
        }
    
        if (Math.sign(fundMyAccountDto.amount) === -1) {
          throw new HttpException(
            'Amount cannot be negative',
            HttpStatus.BAD_REQUEST,
          );
        }
    
        fundMyAccountDto.user = user;
        fundMyAccountDto.type = TransactionType.CREDIT;
        fundMyAccountDto.amount = Number(fundMyAccountDto.amount);
        fundMyAccountDto.description = `₦${fundMyAccountDto.amount} was debited from your wallet`;
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
    
          throw new HttpException(
            'Wallet cannot be credited',
            HttpStatus.BAD_REQUEST,
            { cause: new Error() },
          );
        }
    
        const transaction = await this.transactionsService.saveTransaction(
          fundMyAccountDto,
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
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
    
        const getReceiver = await this.userRepository.findOneBy({
          phoneNumber: transferAccountDto.receiverAccountNo,
        });
    
        if (!getReceiver) {
          throw new HttpException('Receiver not found', HttpStatus.NOT_FOUND);
        }
    
        const senderWallet = await this.getOne({
          user: { id: userId },
        });
    
        if (!senderWallet) {
          throw new HttpException('Sender Wallet not found', HttpStatus.NOT_FOUND);
        }
    
        const receiverWallet = await this.getOne({
          user: { id: getReceiver.id },
        });
    
        if (!receiverWallet) {
          throw new HttpException(
            'Receiver Wallet not found',
            HttpStatus.NOT_FOUND,
          );
        }
    
        if (Math.sign(transferAccountDto.amount) === -1) {
          throw new HttpException(
            'Amount cannot be negative',
            HttpStatus.BAD_REQUEST,
          );
        }
    
        if (transferAccountDto.amount > senderWallet.balance) {
          throw new HttpException('Insufficient funds', HttpStatus.BAD_REQUEST);
        }
    
        const result = await Promise.all([
          // Perform debit operation
          await this.debitWallet(
            senderWallet,
            transferAccountDto.amount,
            queryRunner,
          ),
    
          // Save debit transaction
          await this.transactionsService.saveTransaction(
            // Update fundMyAccountDto for debit
            Object.assign(transferAccountDto, {
              user,
              type: TransactionType.DEBIT,
              amount: Number(transferAccountDto.amount),
              description: `₦${transferAccountDto.amount} was debited from your wallet`,
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
              description: `₦${transferAccountDto.amount} was credited to your wallet.`,
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
    
}

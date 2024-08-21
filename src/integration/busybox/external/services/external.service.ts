import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BusyBoxWebhookResponse, Webhook_Type } from 'src/core/entities/busybox_webhook_logs.entity';
import { Repository } from 'typeorm';
import { TransactionNotifyPayload } from '../interfaces/transaction-notify.interface';
import { WalletService } from 'src/wallet/services/wallet.service';
import { KycWebhookPayload } from '../interfaces/kyc-webhook-payload.interface';
import { UsersService } from 'src/users/services/users.service';

@Injectable()
export class ExternalService {

    constructor(
        @InjectRepository(BusyBoxWebhookResponse) private busyBoxWebHookRepo: Repository<BusyBoxWebhookResponse>,
        private walletService: WalletService,
        private userService: UsersService
    ) {

    }

    // debit amount from wallet
    async handleCardtransactions(payload: TransactionNotifyPayload) {
        try {
            const transactionModel = {
                type: Webhook_Type.TRANSACTION,
                additionalData: payload
            }
            await this.busyBoxWebHookRepo.save(transactionModel);
            await this.walletService.debitAmountOnCardTransaction(payload);
            return {
                message: 'Success'
            }
        } catch(err) {
            // log message
            throw err
        }
    }

    async handleKycEvents(payload: KycWebhookPayload) {
        try {
            const transactionModel = {
                type: Webhook_Type.KYC_EVENT,
                additionalData: payload
            }
            await this.busyBoxWebHookRepo.save(transactionModel);
            await this.userService.handleKycEvent(payload.cardholderId, payload.kycStatus);
            return {
                message: 'Success'
            }
        } catch (err) {
            // log message
            throw err;
        }
    }
}

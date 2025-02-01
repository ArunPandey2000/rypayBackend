import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { NotificationService } from '../services/notification.service';

@Processor('notification')
export class NotificationProcessor {
  constructor(private readonly notificationService: NotificationService) {}

  @Process('recharge')
  async handleRechargeNotification(job: Job) {
    const data = job.data;
    this.notificationService.processRechargeNotification(data);
  }

  @Process('transaction')
  async handleTransactionNotification(job: Job) {
    const data = job.data;
    this.notificationService.processTransactionNotification(data);
  }

  @Process('referrel')
  async handleReferrelNotification(job: Job) {
    const data = job.data;
    this.notificationService.processReferrelNotification(data);
  }

  @Process('cashback')
  async handleCashbackNotification(job: Job) {
    const data = job.data;
    this.notificationService.processCashbackRedemmedNotification(data);
  }

  @Process('newUser')
  async handleNewUserNotification(job: Job) {
    const data = job.data;
    this.notificationService.processUserRegistrationNotification(data);
  }

  @Process('coinExpiry')
  async handleCoinExpiryNotification(job: Job) {
    const data = job.data;
    this.notificationService.processCashbackExpiryNotification(data);
  }
}
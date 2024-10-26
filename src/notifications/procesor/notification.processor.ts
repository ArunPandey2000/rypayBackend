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
}
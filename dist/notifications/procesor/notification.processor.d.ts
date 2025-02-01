import { Job } from 'bull';
import { NotificationService } from '../services/notification.service';
export declare class NotificationProcessor {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    handleRechargeNotification(job: Job): Promise<void>;
    handleTransactionNotification(job: Job): Promise<void>;
    handleReferrelNotification(job: Job): Promise<void>;
    handleCashbackNotification(job: Job): Promise<void>;
    handleNewUserNotification(job: Job): Promise<void>;
    handleCoinExpiryNotification(job: Job): Promise<void>;
}

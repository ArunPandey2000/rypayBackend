import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notification, NotificationType } from 'src/core/entities/notification.entity';
import { User } from 'src/core/entities/user.entity';
import { LessThan, Repository } from 'typeorm';
import { RechargeNotificationDto } from '../dto/recharge-notification.dto';
import { TransactionNotification } from '../dto/transaction-notification.dto';
import { GeneralNotification } from '../dto/announcement-notification.dto';
import { Pagination } from 'src/transactions/dto/pagination-response.dto';
import { createRechargeMessage } from '../constant/recharge-notification-message.constant';
import { createTransactionMessage } from '../constant/transaction-message.constant';

@Injectable()
export class NotificationService {
    constructor(
        @InjectRepository(Notification)
        private notificationRepository: Repository<Notification>,
        @InjectRepository(User) private userRepo: Repository<User>
    ) {}

    async insertInAppNotification(message: string, type: NotificationType, userId?: string): Promise<Notification> {
        let user: User;
        if (userId) {
            user = await this.userRepo.findOne({where: {id: userId}});
        }
        const notification = this.notificationRepository.create({ message, type, user });
        return this.notificationRepository.save(notification);
    }

    async processRechargeNotification(notificationData: RechargeNotificationDto){
        const message = createRechargeMessage({
            amount: notificationData.order.amount,
            rechargeNumber: notificationData.transaction.receiver,
            rechargeStatus: notificationData.transaction.status,
            rechargeType: notificationData.transaction.serviceUsed
        });
        const type = notificationData.transaction.status === "SUCCESS" ? NotificationType.RECHARGE_SUCCESS : NotificationType.RECHARGE_FAILED;
        await this.insertInAppNotification(message, type, notificationData.transaction.user.id);
    }

    async processTransactionNotification(notificationData: TransactionNotification){
        const currentUser = notificationData.transaction.user;
        const message = createTransactionMessage({
            amount: notificationData.transaction.amount,
            bankName: 'RYPAY',
            accountNumber: currentUser.phoneNumber,
            contact: notificationData.transaction.receiver,
            transactionType: notificationData.transaction.type
        });
        const type = notificationData.transaction.status === "SUCCESS" ? NotificationType.RECHARGE_SUCCESS : NotificationType.RECHARGE_FAILED;
        await this.insertInAppNotification(message, type, notificationData.transaction.user.id);
    }

    async processAnnouncementNotification(notificationData: GeneralNotification){
        const notification = this.notificationRepository.create({
            ...notificationData,
            user: null,
            isRead: true // no need to have this field as announcements are for each user
         });
        return this.notificationRepository.save(notification);
    }

    async findAllPaginated(userId: string, page: number, limit: number) {
        const [notifications, total] = await this.notificationRepository
        .createQueryBuilder('notification')
        .where('notification.userId = :userId OR notification.userId IS NULL', { userId })
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy('notification.createdAt', 'DESC')
        .getManyAndCount();
        const pagination = new Pagination();
        return pagination.PaginateResponse(notifications, total, page, limit);
      }

    async markAllRead(userId: string): Promise<boolean> {
        const user = await this.userRepo.findOneBy({id: userId});
        if (!user) {
            throw new ForbiddenException('User does not have enough permissions');
        }
        await this.notificationRepository.update({}, {isRead: true});
        return true;
    }

    async markAsRead(notificationId: number): Promise<Notification> {
        const notification = await this.notificationRepository.findOne({where: {id: notificationId}});
        notification.isRead = true; 
        return this.notificationRepository.save(notification);
    }

    async deleteOldNotifications() {
        const fourteenDaysAgo = new Date();
        fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
        await this.notificationRepository.delete({
            createdAt: LessThan(fourteenDaysAgo)
        });
    }
}

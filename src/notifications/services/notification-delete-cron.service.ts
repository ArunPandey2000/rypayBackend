import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import { NotificationService } from "./notification.service";

@Injectable()
export class NotificationCronJob {

    constructor(private notificationService: NotificationService) {

    }
    @Cron(CronExpression.EVERY_DAY_AT_10AM)
    async handleCron() {
        console.log('deleting old notifications.........');
        await this.notificationService.deleteOldNotifications();
        console.log('deleting old notifications success.........');
    }
}
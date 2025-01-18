import { Injectable, OnModuleInit } from "@nestjs/common";
import { CronExpression, SchedulerRegistry } from "@nestjs/schedule";
import { NotificationService } from "./notification.service";
import { CronJob } from "cron";

@Injectable()
export class NotificationCronJob implements OnModuleInit {
    constructor(private notificationService: NotificationService,private schedulerRegistry: SchedulerRegistry) { 
    }
    onModuleInit() {
        if (this.shouldRegisterCron()) {
          const job = new CronJob(CronExpression.EVERY_5_SECONDS, () => {
            this.handleCron();
          });
    
          this.schedulerRegistry.addCronJob('conditionalCronJob', job);
          job.start();
        }
      }
    
      shouldRegisterCron(): boolean {
        return process.env.DELETE_NOTIFICATIONS_14DAYS === "true"; 
    }
    async handleCron() {
        console.log(process.env.DELETE_NOTIFICATIONS_14DAYS === "true")
        console.log('deleting old notifications.........');
        await this.notificationService.deleteOldNotifications();
        console.log('deleting old notifications success.........');
    }
}
import { OnModuleInit } from "@nestjs/common";
import { SchedulerRegistry } from "@nestjs/schedule";
import { NotificationService } from "./notification.service";
export declare class NotificationCronJob implements OnModuleInit {
    private notificationService;
    private schedulerRegistry;
    constructor(notificationService: NotificationService, schedulerRegistry: SchedulerRegistry);
    onModuleInit(): void;
    shouldRegisterCron(): boolean;
    handleCron(): Promise<void>;
}

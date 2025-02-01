"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationCronJob = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const notification_service_1 = require("./notification.service");
const cron_1 = require("cron");
let NotificationCronJob = class NotificationCronJob {
    constructor(notificationService, schedulerRegistry) {
        this.notificationService = notificationService;
        this.schedulerRegistry = schedulerRegistry;
    }
    onModuleInit() {
        if (this.shouldRegisterCron()) {
            const job = new cron_1.CronJob(schedule_1.CronExpression.EVERY_5_SECONDS, () => {
                this.handleCron();
            });
            this.schedulerRegistry.addCronJob('conditionalCronJob', job);
            job.start();
        }
    }
    shouldRegisterCron() {
        return process.env.DELETE_NOTIFICATIONS_14DAYS === "true";
    }
    async handleCron() {
        console.log(process.env.DELETE_NOTIFICATIONS_14DAYS === "true");
        console.log('deleting old notifications.........');
        await this.notificationService.deleteOldNotifications();
        console.log('deleting old notifications success.........');
    }
};
exports.NotificationCronJob = NotificationCronJob;
exports.NotificationCronJob = NotificationCronJob = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [notification_service_1.NotificationService, schedule_1.SchedulerRegistry])
], NotificationCronJob);
//# sourceMappingURL=notification-delete-cron.service.js.map
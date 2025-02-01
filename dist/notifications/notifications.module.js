"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationsModule = void 0;
const common_1 = require("@nestjs/common");
const otp_flow_service_1 = require("./services/otp-flow.service");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
const sms_client_service_1 = require("./sms-client.service");
const mailer_1 = require("@nestjs-modules/mailer");
const mail_controller_1 = require("./controllers/mail.controller");
const mail_service_1 = require("./services/mail.service");
const otp_repository_1 = require("./repository/otp.repository");
const typeorm_1 = require("@nestjs/typeorm");
const otp_info_entity_1 = require("../core/entities/otp-info.entity");
const notification_entity_1 = require("../core/entities/notification.entity");
const notification_controller_1 = require("./controllers/notification.controller");
const bull_1 = require("@nestjs/bull");
const notification_bridge_1 = require("./services/notification-bridge");
const notification_service_1 = require("./services/notification.service");
const schedule_1 = require("@nestjs/schedule");
const user_entity_1 = require("../core/entities/user.entity");
const notification_delete_cron_service_1 = require("./services/notification-delete-cron.service");
const notification_processor_1 = require("./procesor/notification.processor");
const firebase_client_service_1 = require("../integration/firebase/firebase.client.service");
let NotificationsModule = class NotificationsModule {
};
exports.NotificationsModule = NotificationsModule;
exports.NotificationsModule = NotificationsModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule, config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forFeature([otp_info_entity_1.OtpInfo, notification_entity_1.Notification, user_entity_1.User]),
            schedule_1.ScheduleModule.forRoot(),
            bull_1.BullModule.registerQueue({
                name: 'notification',
            }),
            mailer_1.MailerModule.forRoot({
                transport: {
                    service: 'gmail',
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    auth: {
                        user: "riyadhmicrofinance@gmail.com",
                        pass: "xqjryatlvvyemecy",
                    },
                },
            })
        ],
        controllers: [notification_controller_1.NotificationController, mail_controller_1.MailController],
        providers: [otp_flow_service_1.OtpFlowService, notification_delete_cron_service_1.NotificationCronJob, notification_processor_1.NotificationProcessor, notification_bridge_1.NotificationBridge, notification_service_1.NotificationService, sms_client_service_1.SmsClientService, mail_service_1.MailService, otp_repository_1.OtpRepository, firebase_client_service_1.FirebaseClientService],
        exports: [otp_flow_service_1.OtpFlowService, notification_bridge_1.NotificationBridge],
    })
], NotificationsModule);
//# sourceMappingURL=notifications.module.js.map
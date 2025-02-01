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
exports.FirebaseClientService = void 0;
const common_1 = require("@nestjs/common");
const app_1 = require("../../app");
let FirebaseClientService = class FirebaseClientService {
    constructor() {
        this.fireBaseInstance = app_1.AppInstance.getFirbaseInstance();
    }
    async sendNotification({ token, title, body, icon }) {
        try {
            const response = await this.fireBaseInstance.messaging().send({
                token,
                notification: {
                    title,
                    body,
                    imageUrl: icon ? icon : undefined
                }
            });
            return response;
        }
        catch (error) {
            throw error;
        }
    }
    async sendNotificationToMultipleTokens({ tokens, title, body, icon, }) {
        const message = {
            notification: {
                title,
                body,
                icon,
            },
            tokens,
        };
        try {
            const response = await this.fireBaseInstance.messaging().sendEachForMulticast(message);
            console.log("Successfully sent messages:", response);
            return {
                success: true,
                message: `Successfully sent ${response.successCount} messages; ${response.failureCount} failed.`,
            };
        }
        catch (error) {
            console.log("Error sending messages:", error);
            return { success: false, message: "Failed to send notifications" };
        }
    }
    async sendTopicNotification({ topic, title, body, icon, }) {
        const message = {
            notification: {
                title,
                body,
                icon,
            },
            topic,
        };
        try {
            const response = await this.fireBaseInstance.messaging().send(message);
            console.log("Successfully sent message:", response);
            return { success: true, message: "Topic notification sent successfully" };
        }
        catch (error) {
            console.log("Error sending message:", error);
            return { success: false, message: "Failed to send topic notification" };
        }
    }
};
exports.FirebaseClientService = FirebaseClientService;
exports.FirebaseClientService = FirebaseClientService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FirebaseClientService);
//# sourceMappingURL=firebase.client.service.js.map
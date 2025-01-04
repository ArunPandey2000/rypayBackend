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
exports.NotificationProcessor = void 0;
const bull_1 = require("@nestjs/bull");
const notification_service_1 = require("../services/notification.service");
let NotificationProcessor = class NotificationProcessor {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async handleRechargeNotification(job) {
        const data = job.data;
        this.notificationService.processRechargeNotification(data);
    }
    async handleTransactionNotification(job) {
        const data = job.data;
        this.notificationService.processTransactionNotification(data);
    }
};
exports.NotificationProcessor = NotificationProcessor;
__decorate([
    (0, bull_1.Process)('recharge'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationProcessor.prototype, "handleRechargeNotification", null);
__decorate([
    (0, bull_1.Process)('transaction'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NotificationProcessor.prototype, "handleTransactionNotification", null);
exports.NotificationProcessor = NotificationProcessor = __decorate([
    (0, bull_1.Processor)('notification'),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationProcessor);
//# sourceMappingURL=notification.processor.js.map
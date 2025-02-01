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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationBridge = void 0;
const bull_1 = require("@nestjs/bull");
let NotificationBridge = class NotificationBridge {
    constructor(notificationQueue) {
        this.notificationQueue = notificationQueue;
    }
    async add(processName, opt) {
        return this.notificationQueue.add(processName, opt);
    }
};
exports.NotificationBridge = NotificationBridge;
exports.NotificationBridge = NotificationBridge = __decorate([
    __param(0, (0, bull_1.InjectQueue)('notification')),
    __metadata("design:paramtypes", [Object])
], NotificationBridge);
//# sourceMappingURL=notification-bridge.js.map
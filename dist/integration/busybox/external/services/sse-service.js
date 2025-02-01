"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SseService = void 0;
const common_1 = require("@nestjs/common");
let SseService = class SseService {
    constructor() {
        this.userClients = new Map();
    }
    addClient(userId, res) {
        if (!this.userClients.has(userId)) {
            this.userClients.set(userId, []);
        }
        this.userClients.get(userId).push(res);
    }
    removeClient(userId, res) {
        if (this.userClients.has(userId)) {
            const clients = this.userClients.get(userId);
            this.userClients.set(userId, clients.filter(client => client !== res));
        }
    }
    sendToUser(userId, update) {
        if (this.userClients.has(userId)) {
            this.userClients.get(userId).forEach(client => client.write(`data: ${JSON.stringify(update)}\n\n`));
        }
    }
};
exports.SseService = SseService;
exports.SseService = SseService = __decorate([
    (0, common_1.Injectable)()
], SseService);
//# sourceMappingURL=sse-service.js.map
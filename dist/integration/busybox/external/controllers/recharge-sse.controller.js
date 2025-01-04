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
exports.SseController = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const sse_service_1 = require("../services/sse-service");
const swagger_1 = require("@nestjs/swagger");
class WebhookRequest {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WebhookRequest.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WebhookRequest.prototype, "rechargeId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], WebhookRequest.prototype, "status", void 0);
let SseController = class SseController {
    constructor(sseService) {
        this.sseService = sseService;
        this.sseSubject = new rxjs_1.Subject();
    }
    sse(req, id) {
        const userId = id;
        return this.sseSubject.pipe((0, rxjs_1.filter)((data) => data.userId === userId), (0, rxjs_1.map)((data) => {
            return new MessageEvent('recharge', { data });
        }));
    }
    handleWebhook(body) {
        const { userId, rechargeId, status } = body;
        console.log(`Received webhook for userId ${userId}, rechargeId ${rechargeId} with status ${status}`);
        this.sseSubject.next(body);
        return 'Received';
    }
};
exports.SseController = SseController;
__decorate([
    (0, common_1.Sse)('/sse/:id'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", rxjs_1.Observable)
], SseController.prototype, "sse", null);
__decorate([
    (0, common_1.Post)('webhook'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [WebhookRequest]),
    __metadata("design:returntype", void 0)
], SseController.prototype, "handleWebhook", null);
exports.SseController = SseController = __decorate([
    (0, swagger_1.ApiTags)('SSE'),
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [sse_service_1.SseService])
], SseController);
//# sourceMappingURL=recharge-sse.controller.js.map
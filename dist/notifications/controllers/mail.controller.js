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
exports.MailController = void 0;
const common_1 = require("@nestjs/common");
const mail_service_1 = require("../services/mail.service");
const swagger_1 = require("@nestjs/swagger");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
let MailController = class MailController {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMailer(response) {
        const context = {
            userName: 'Aarif',
            amount: 500,
            header: 'Transaction Alert',
            accountNumber: 'XXXXXX1234',
            upiId: 'mdaarif@ybl'
        };
        const templatePath = path.resolve(__dirname, '../templates', 'amount-credited.hbs');
        const template = fs.readFileSync(templatePath, 'utf-8');
        const mail = await this.mailService.sendMail(['arun03178@gmail.com'], 'Amount Credited', Handlebars.compile(template)(context));
        return response.status(200).json({
            message: 'success',
            mail,
        });
    }
};
exports.MailController = MailController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'sends mail' }),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MailController.prototype, "sendMailer", null);
exports.MailController = MailController = __decorate([
    (0, common_1.Controller)('test-mail'),
    (0, swagger_1.ApiTags)('mail'),
    __metadata("design:paramtypes", [mail_service_1.MailService])
], MailController);
//# sourceMappingURL=mail.controller.js.map
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
exports.MailService = void 0;
const mailer_1 = require("@nestjs-modules/mailer");
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const Handlebars = require("handlebars");
let MailService = class MailService {
    constructor(mailService) {
        this.mailService = mailService;
    }
    async sendMail(to, subject, template) {
        await this.mailService.sendMail({
            from: 'no-reply <riyadh-microfinace>',
            to,
            subject,
            html: template,
        });
    }
    async sendOtpMailToUser(to, subject, otp) {
        const context = {
            header: 'Your OTP Code',
            otp
        };
        const templatePath = path.resolve(__dirname, '../templates', 'otp.hbs');
        const template = fs.readFileSync(templatePath, 'utf-8');
        this.sendMail(to, subject, Handlebars.compile(template)(context));
    }
};
exports.MailService = MailService;
exports.MailService = MailService = __decorate([
    (0, common_1.Injectable)({
        scope: common_1.Scope.DEFAULT
    }),
    __metadata("design:paramtypes", [mailer_1.MailerService])
], MailService);
//# sourceMappingURL=mail.service.js.map
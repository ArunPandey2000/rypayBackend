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
exports.PdfService = void 0;
const common_1 = require("@nestjs/common");
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const puppeteer_1 = require("puppeteer");
const nestjs_pino_1 = require("nestjs-pino");
let PdfService = class PdfService {
    constructor(logger) {
        this.logger = logger;
    }
    async generatePDF(data) {
        const templatePath = path.resolve(__dirname, '../templates', 'invoice.hbs');
        const template = fs.readFileSync(templatePath, 'utf-8');
        Handlebars.registerHelper('ifEquals', function (arg1, arg2, options) {
            return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
        });
        const compiledTemplate = Handlebars.compile(template);
        const documentPath = path.resolve(__dirname, '../templates', 'output.pdf');
        const document = {
            template: compiledTemplate(data),
            context: data,
            path: documentPath,
        };
        var html = Handlebars.compile(document.template)(document.context);
        return this.generateHtmlToPdf(html);
    }
    async generateHtmlToPdf(htmlContent) {
        try {
            const browser = await puppeteer_1.default.launch({
                headless: true,
                ignoreDefaultArgs: ["--disable-extensions"],
                args: [
                    "--no-sandbox",
                    "--disable-setuid-sandbox",
                    "--hide-scrollbars",
                    "--disable-gpu",
                    "--mute-audio",
                    "--disable-dev-shm-usage"
                ],
            });
            const page = await browser.newPage();
            await page.setContent(htmlContent);
            const pdf = await page.pdf({
                landscape: true,
            });
            browser.close();
            return pdf;
        }
        catch (error) {
            this.logger.error('failed to generate pdf');
            throw error;
        }
    }
    ;
};
exports.PdfService = PdfService;
exports.PdfService = PdfService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, nestjs_pino_1.InjectPinoLogger)(PdfService.name)),
    __metadata("design:paramtypes", [nestjs_pino_1.Logger])
], PdfService);
//# sourceMappingURL=pdf.service.js.map
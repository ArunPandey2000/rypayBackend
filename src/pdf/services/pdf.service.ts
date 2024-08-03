// src/pdf/pdf.service.ts
import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import puppeteer from 'puppeteer';
import { InjectPinoLogger, Logger } from 'nestjs-pino';

@Injectable()
export class PdfService {

  constructor(@InjectPinoLogger(PdfService.name) private logger: Logger) {

  }
  async generatePDF(data: any): Promise<Buffer> {
    const templatePath = path.resolve(__dirname, '../templates', 'invoice.hbs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const compiledTemplate = Handlebars.compile(template);

    const documentPath = path.resolve(__dirname, '../templates', 'output.pdf')

    const document = {
      template: compiledTemplate(data),
      context: data,
      path: documentPath,
    };

    var html = Handlebars.compile(document.template)(document.context);
    return this.generateHtmlToPdf(html);
  }

  async generateHtmlToPdf(htmlContent: string) {
    try {
      const browser = await puppeteer.launch({
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
    } catch (error) {
      this.logger.error('failed to generate pdf');
      throw error;
    }
  };
}

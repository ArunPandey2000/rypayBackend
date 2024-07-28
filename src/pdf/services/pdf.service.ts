// src/pdf/pdf.service.ts
import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import * as fs from 'fs';
import * as path from 'path';
import * as htmlPdf from 'html-pdf-node';

@Injectable()
export class PdfService {
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
    const options = {
        format: 'A4', // You can customize the format (e.g., A4, Letter, etc.)
      };
      
      const file = {
        content: html, 
      };
      return htmlPdf.generatePdf(file, options);
  }
}

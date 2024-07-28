// src/pdf/pdf.controller.ts
import { Controller, Post, Body, Res } from '@nestjs/common';
import { Response } from 'express';
import { PdfService } from './services/pdf.service';

class response {
    
}
@Controller('pdf')
export class PdfController {
  constructor(private readonly pdfService: PdfService) {}

  @Post('generate')
  async generatePDF(@Body() data: response, @Res() res: Response): Promise<void> {
    const pdfBuffer = await this.pdfService.generatePDF(data);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=example.pdf',
      'Content-Length': pdfBuffer.length,
    });
    res.end(pdfBuffer);
  }
}

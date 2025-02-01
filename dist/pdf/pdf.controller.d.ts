import { Response } from 'express';
import { PdfService } from './services/pdf.service';
declare class response {
}
export declare class PdfController {
    private readonly pdfService;
    constructor(pdfService: PdfService);
    generatePDF(data: response, res: Response): Promise<void>;
}
export {};

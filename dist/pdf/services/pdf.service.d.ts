import { Logger } from 'nestjs-pino';
export declare class PdfService {
    private logger;
    constructor(logger: Logger);
    generatePDF(data: any): Promise<Buffer>;
    generateHtmlToPdf(htmlContent: string): Promise<Buffer>;
}

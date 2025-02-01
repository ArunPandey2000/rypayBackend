import { MailService } from '../services/mail.service';
export declare class MailController {
    private readonly mailService;
    constructor(mailService: MailService);
    sendMailer(response: any): Promise<any>;
}

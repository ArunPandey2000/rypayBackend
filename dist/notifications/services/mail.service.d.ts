import { MailerService } from '@nestjs-modules/mailer';
export declare class MailService {
    private readonly mailService;
    constructor(mailService: MailerService);
    sendMail(to: string | string[], subject: string, template: string): Promise<void>;
    sendOtpMailToUser(to: string, subject: string, otp: string): Promise<void>;
}

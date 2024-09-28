import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendMail(to: string | string[], subject: string, template: string) {
    await this.mailService.sendMail({
      from: 'no-reply <riyadh-microfinace>',
      to,
      subject,
      html: template,
    });
  }
}
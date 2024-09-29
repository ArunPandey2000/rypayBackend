import { MailerService } from '@nestjs-modules/mailer';
import { Global, Injectable, Scope } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Injectable({
    scope: Scope.DEFAULT
})
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

  async sendOtpMailToUser(to: string, subject: string, otp: string) {
    const context = {
        header: 'Your OTP Code',
        otp
    }
    const templatePath = path.resolve(__dirname, '../templates', 'otp.hbs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    this.sendMail(to, subject, Handlebars.compile(template)(context));
  }
}
import { Controller, Get, Res } from '@nestjs/common';
import { MailService } from '../services/mail.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import * as fs from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

@Controller('test-mail')
@ApiTags('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  @ApiOperation({ summary: 'sends mail' })
  async sendMailer(@Res() response: any) {
    const context = {
        userName: 'Aarif',
        amount: 500,
        header: 'Transaction Alert',
        accountNumber: 'XXXXXX1234',
        upiId: 'mdaarif@ybl'
    }
    const templatePath = path.resolve(__dirname, '../templates', 'amount-credited.hbs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    const mail = await this.mailService.sendMail(['arun03178@gmail.com','aarifmd8587@gmail.com' ], 'Amount Credited', Handlebars.compile(template)(context) );

    return response.status(200).json({
      message: 'success',
      mail,
    });
  }
}
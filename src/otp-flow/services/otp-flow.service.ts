import { Injectable } from '@nestjs/common';
import { SmsClientService } from '../sms-client.service';

@Injectable()
export class OtpFlowService {
    constructor(private smsClientService: SmsClientService) {

    }
    async sendOtp(phoneNumber: string, otp: string) {
        try{
            const response = await this.smsClientService.sendOtpToPhone(phoneNumber, otp);
            return response.data;
        }
        catch(err) {
            throw err
        }
    }
}

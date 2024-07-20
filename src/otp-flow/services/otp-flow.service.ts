import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpFlowService {
    async sendOtp(phoneNumber: string) {
        console.log(phoneNumber);
    }
}

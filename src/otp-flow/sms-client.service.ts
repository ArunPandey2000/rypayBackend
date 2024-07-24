import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { OTPFlowPayload } from "./constant/otp-flow.constant";
import { OTPFLowDto } from "./dto/otp-flow.dto";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";

@Injectable()
export class SmsClientService {
    constructor(private httpService: HttpService,
        private configService: ConfigService
    ) {

    }

    async sendOtpToPhone(phone: string, otp: string) {
        try {
            const payload: OTPFLowDto = {
                ...OTPFlowPayload,
                variables_values: `${otp}|`,
                numbers: phone
            }
            const headerConfig = {
                headers: {
                    authorization: this.configService.get('SMS_CLIENT_KEY')
                }
            }
            return lastValueFrom(this.httpService.post(this.configService.get('SMS_CLIENT_URL'), payload, headerConfig));
        } catch (err) {
            //log error, will finalize logger
            throw err;
        }
    }
}
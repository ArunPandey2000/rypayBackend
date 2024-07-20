import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OtpInfo } from "src/core/entities/otp-info.entity";
import { User } from "src/core/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(OtpInfo) private otpRepo: Repository<OtpInfo>
  ) { }
  
  async upsertOtpInfo(phoneNumber: string, otp: string) {
    let otpRecord = await this.otpRepo.findOne({
      where: {
        phoneNumber: phoneNumber
      }
    });
    if (otpRecord) {
      otpRecord.phoneNumber = phoneNumber;
      otpRecord.otpValue = otp;
    } else {
      otpRecord = this.otpRepo.create({
        phoneNumber: phoneNumber,
        otpValue: otp
      });
    }
    // const otpRecord = this.otpRepo.upsert({ phoneNumber: phoneNumber, otpValue: otp }, { conflictPaths: [], upsertType: 'on-conflict-do-update' });
    return this.otpRepo.save(otpRecord)
  }
}
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { OtpInfo } from "src/core/entities/otp-info.entity";
import { User } from "src/core/entities/user.entity";
import { Repository } from "typeorm";
import { OTPValidateStatus } from "../enum/otp-verification-status.enum";
import { NotFoundError } from "rxjs";

@Injectable()
export class OtpRepository {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(OtpInfo) private otpRepo: Repository<OtpInfo>
  ) { }

  async upsertOtpInfo(phoneNumber: string, otp: string) {
    let otpRecord = await this.findByPhoneNumber(phoneNumber);
    if (otpRecord) {
      otpRecord.phoneNumber = phoneNumber;
      otpRecord.otpValue = otp;
      otpRecord.isUsed = false;
    } else {
      otpRecord = this.otpRepo.create({
        phoneNumber: phoneNumber,
        otpValue: otp,
        isUsed: false
      });
    }
    // should use upsert instead of find and update
    // const otpRecord = this.otpRepo.upsert({ phoneNumber: phoneNumber, otpValue: otp }, { conflictPaths: [], upsertType: 'on-conflict-do-update' });

    return this.otpRepo.save(otpRecord);
  }

  async validateUserOtp(phoneNumber: string, otp: string) {
    const record = await this.findByPhoneNumber(phoneNumber);
    if (!record) {
      throw new NotFoundException(OTPValidateStatus.NOT_FOUND)
    }
    const isExpired = this.isTimePassedOut(record.expiryTime);
    if (isExpired || record.isUsed) {
      throw new BadRequestException(OTPValidateStatus.EXPIRED);
    }
    if (record.otpValue === otp) {
      await this.updateOTPUsedRecord(record);
      return {
        message: OTPValidateStatus.VALID
      };
    }
    throw new BadRequestException(OTPValidateStatus.INVALID);
  }

  async updateOTPUsedRecord(record: OtpInfo) {
    record.isUsed = true;
    return this.otpRepo.save(record);
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.otpRepo.findOne({
      where: {
        phoneNumber: phoneNumber
      }
    });
  }

  isTimePassedOut(date: Date) {
    const currentTime = new Date();
    return currentTime.getTime() > date.getTime();
  }
}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpInfo = void 0;
const typeorm_1 = require("typeorm");
let OtpInfo = class OtpInfo {
    setExpireTime() {
        this.generatedTime = new Date();
        const thirtyDaysFromNow = new Date();
        let otpEXpireTimeInMinute = +process.env.OTP_EXPIRATION_TIME;
        if (!otpEXpireTimeInMinute) {
            otpEXpireTimeInMinute = 10;
        }
        thirtyDaysFromNow.setMinutes(thirtyDaysFromNow.getMinutes() + otpEXpireTimeInMinute);
        this.expiryTime = thirtyDaysFromNow;
    }
};
exports.OtpInfo = OtpInfo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OtpInfo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        name: 'phone_number',
        type: 'varchar',
        nullable: false,
        unique: true,
    }),
    __metadata("design:type", String)
], OtpInfo.prototype, "phoneNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'otp_value', type: 'varchar', nullable: false }),
    __metadata("design:type", String)
], OtpInfo.prototype, "otpValue", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'generated_time',
        type: 'timestamp with time zone',
    }),
    __metadata("design:type", Date)
], OtpInfo.prototype, "generatedTime", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ name: 'expiry_time', type: 'timestamp with time zone' }),
    __metadata("design:type", Date)
], OtpInfo.prototype, "expiryTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'is_used', type: 'boolean', default: false }),
    __metadata("design:type", Boolean)
], OtpInfo.prototype, "isUsed", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], OtpInfo.prototype, "setExpireTime", null);
exports.OtpInfo = OtpInfo = __decorate([
    (0, typeorm_1.Entity)({ name: 'otp_info' }),
    (0, typeorm_1.Unique)(['phoneNumber', 'id'])
], OtpInfo);
//# sourceMappingURL=otp-info.entity.js.map
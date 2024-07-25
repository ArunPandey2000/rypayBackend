import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  BeforeUpdate,
  BeforeInsert,
} from 'typeorm';

@Entity({ name: 'otp_info' })
@Unique(['phoneNumber', 'id'])
export class OtpInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  phoneNumber: string;

  @Column({ name: 'otp_value', type: 'varchar', nullable: false })
  otpValue: string;

  @CreateDateColumn({
    name: 'generated_time',
    type: 'timestamp with time zone',
  })
  generatedTime: Date;

  @UpdateDateColumn({ name: 'expiry_time', type: 'timestamp with time zone' })
  expiryTime: Date;

  @Column({ name: 'is_used', type: 'boolean', default: false })
  isUsed: boolean;

  @BeforeUpdate()
  @BeforeInsert()
  setExpireTime() {
    this.generatedTime = new Date();
    const thirtyDaysFromNow = new Date();
    let otpEXpireTimeInMinute = +process.env.OTP_EXPIRATION_TIME;
    if (!otpEXpireTimeInMinute) {
      otpEXpireTimeInMinute = 10;
    }
    thirtyDaysFromNow.setMinutes(
      thirtyDaysFromNow.getMinutes() + otpEXpireTimeInMinute,
    );
    this.expiryTime = thirtyDaysFromNow;
  }
}

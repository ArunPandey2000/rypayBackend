import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'otp_info' })
export class OtpInfo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'phone_number', type: 'varchar', nullable: false })
    phoneNumber: string;

    @Column({ name: 'otp_value', type: 'varchar', nullable: false })
    otpValue: string;

    @CreateDateColumn({ name: 'generated_time', type: 'timestamp' })
    generatedTime: Date;

    @UpdateDateColumn({ name: 'expiry_time', type: 'timestamp' })
    expiryTime: Date;

    @Column({ name: 'is_used', type: 'boolean', default: false })
    isUsed: boolean;
}

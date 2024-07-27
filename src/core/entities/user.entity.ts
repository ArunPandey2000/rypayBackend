import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { KycVerificationStatus } from '../enum/kyc-verification-status.enum';
import { UserRole } from '../enum/user-role.enum';
import { Address } from './address.entity';
import { Document } from './document.entity';
import { Merchant } from './merchant.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ name: 'aadhar_number', type: 'varchar', unique: true })
  aadharNumber: string;

  @Column({ name: 'pan_number', type: 'varchar', unique: true })
  panNumber: string;

  @Column({ name: 'is_kyc_verified', type: 'smallint', default: 0 })
  kycVerificationStatus: KycVerificationStatus;

  @Column({ name: 'gender', type: 'char', default: 'M' })
  gender: string;

  @Column({ name: 'card_holder_id', type: 'varchar', unique: true })
  cardHolderId: string;

  @OneToMany(() => Document, (document) => document.user)
  documents: Document[];

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'dob' })
  dob: string;

  @Column({ name: 'role' })
  role: UserRole;

  @OneToOne(() => Address, (add) => add.id, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Merchant, (merchant) => merchant.id, { cascade: true })
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;
}

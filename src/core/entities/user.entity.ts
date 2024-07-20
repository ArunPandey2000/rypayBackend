import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { Address } from './address.entity';
import { KycVerificationStatus } from '../enum/kyc-verification-status.enum';
import { Wallet } from './wallet.entity';
import { Document } from './document.entity';
import { UserRole } from '../enum/user-role.enum';
import { Merchant } from './merchant.entity';

@Entity({name: 'users'})
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column({ name: 'is_kyc_verified', type: 'tinyint', default: 0 })
  kycVerificationStatus: KycVerificationStatus;

  @OneToOne(() => Wallet, { cascade: true })
  @JoinColumn()
  wallet: Wallet;

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

  @Column({ name: 'token' })
  token: string;

  @Column({ name: 'role' })
  role: UserRole;

  @OneToOne(() => Address, (add) => add.id, { cascade: true })
  @JoinColumn({ name: 'address_id' })
  address: Address;

  @OneToOne(() => Merchant, (merchant) => merchant.id, { cascade: true })
  @JoinColumn({ name: 'merchant_id' })
  merchant: Merchant;

  @Column({
    name: 'status',
    type: 'text',
  })
  status: string;
}

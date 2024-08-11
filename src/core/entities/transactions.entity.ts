import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { User } from './user.entity';

export enum TransactionStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  DISPUTED = 'DISPUTED',
}

@Entity({ name: 'transactions' })
export class Transaction {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;
  
  @Column()
  walletBalanceBefore: number;

  @Column()
  walletBalanceAfter: number;

  @Column({ name: 'amount' })
  amount: number;

  @Column({ name: 'description' })
  description: string;

  @Column({ name: 'type' })
  type: 'CREDIT' | 'DEBIT';

  @Column({ name: 'service_used' })
  serviceUsed: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ nullable: true })
  sender: string;

  @Column({ nullable: true })
  receiver: string;

  @Column({name: 'transaction-hash'})
  transactionHash: string;

  @Column()
  reference: string; //orderid

  @Column()
  transactionDate: Date;

  @Column({
    type: 'enum',
    enum: TransactionStatus,
    default: TransactionStatus.PENDING
  })
  status: TransactionStatus;
}

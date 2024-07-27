import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Check,
} from 'typeorm';
import { Wallet } from './wallet.entity';
import { User } from './user.entity';

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
  reference: string;

  @Column()
  transactionDate: Date;

  @Column({ default: 0 })
  @Check('balance >= 0')
  balance: number;
}

import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    UpdateDateColumn, Check,
  } from 'typeorm';
  import { Wallet } from './wallet.entity';
  
  @Entity({ name: 'transactions' })
  export class Transaction {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;
  
    @Column({ name: 'wallet_id' })
    walletId: number;
  
    @ManyToOne(() => Wallet, (wallet) => wallet.transactions, { nullable: false })
    @JoinColumn({ name: 'wallet_id' })
    wallet: Wallet;
  
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
  
    @Column({
      name: 'credit_type',
      type: 'text'
    })
    credit_type: string;
  
    @Column({ default: 0 })
    @Check('balance >= 0')
    balance: number;
  }
  
import {
    Check,
    Column,
    Entity,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { User } from './user.entity';
import { Transaction } from './transactions.entity';
  
  @Entity()
  export class Wallet {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ default: 0 })
    @Check('balance >= 0')
    balance: number;
  
    @OneToMany(() => Transaction, (transaction) => transaction.wallet, {
      cascade: true,
    })
    transactions: Transaction[];
  
    @OneToOne(() => User)
    user: User;
  
    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
  
    @Column({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP',
      onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
  }
  
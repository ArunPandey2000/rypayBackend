import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum OrderType {
  RECHARGE = 'RECHARGE',
  TRANSFER = 'TRANSFER',
  PAYMENT = 'PAYMENT',
  PAYOUT = 'PAYOUT'
  // Add more order types as needed
}

export enum OrderStatus {
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  FAILED = 'FAILED',
  DISPUTED = 'DISPUTED',
  // Add more statuses as needed
}

@Entity('orders')
export class Order {
  @PrimaryColumn({
    type: 'varchar',
    length: 10
    })
  order_id: string;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    type: 'enum',
    enum: OrderType,
    default: OrderType.RECHARGE
  })
  order_type: OrderType;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.00
  })
  amount: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
    default: OrderStatus.PENDING
  })
  status: OrderStatus;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  transaction_id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true
  })
  payment_method: string;

  @Column({
    type: 'text',
    nullable: true
  })
  gateway_response: string;

  @Column({
    type: 'text',
    nullable: true
  })
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';

export enum NotificationType {
    TRANSACTION_CREDIT = 'TRANSACTION_CREDIT',
    TRANSACTION_DEBIT = 'TRANSACTION_DEBIT',
    TRANSACTION_FAILED = 'TRANSACTION_FAILED',
    RECHARGE_SUCCESS = 'RECHARGE_SUCCESS',
    RECHARGE_FAILED = 'RECHARGE_FAILED',
    ANNOUNCEMENT = 'ANNOUNCEMENT',
    REFERREL_BONUS = 'REFERREL_BONUS',
    CASHBACK_REDEEMED = 'CASHBACK_REDEEMED',
    RYCOIN_EXPIRED = 'RYCOIN_EXPIRED'
}

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    message: string;

    @Column({ type: 'enum', enum: NotificationType })
    type: NotificationType;

    @ManyToOne(() => User, (user) => user.notifications, { nullable: true })
    user: User | null;

    @Column({ type: 'boolean', default: false })
    isRead: boolean;

    @CreateDateColumn()
    createdAt: Date;
}
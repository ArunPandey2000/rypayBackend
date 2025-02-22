import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Plan } from './plans.entity';

@Entity('plan_limits')
export class PlanLimit {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Plan, (plan) => plan.limits, { onDelete: 'CASCADE' })
  plan: Plan;

  @Column({ type: 'varchar', length: 50 })
  transactionType: string; // e.g., UPI, NEFT/RTGS/IMPS

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true, transformer: {
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value), 
  } })
  perTransactionLimit: number; // Nullable for UPI

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: {
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value), 
  } })
  dailyLimit: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, transformer: {
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value), 
  } })
  monthlyLimit: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

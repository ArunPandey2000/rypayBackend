import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('moneyRequest')
export class MoneyRequest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  paidAt: Date;

  @Column()
  modeOfPayment: string;

  @Column({unique: true})
  UTR: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  paidAmount: number; // Amount paid by the user

  @Column({ type: 'enum', enum: ['Requested', 'Rejected', 'Paid'], default: 'Requested' })
  status: 'Requested' | 'Rejected' | 'Paid';

  @ManyToOne(() => User, (user) => user.loans, { onDelete: 'CASCADE', eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

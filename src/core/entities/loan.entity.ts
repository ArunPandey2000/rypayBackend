import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanAccount: string;

  @Column('decimal', { precision: 10, scale: 2 })
  installmentAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  overdueAmount: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  totalAmount: number;

  @Column({
    name: 'dueDate',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dueDate: Date;

  @Column({ type: 'enum', enum: ['Pending', 'PartiallyPaid', 'Paid'], default: 'Pending' })
  loanStatus: 'Pending' | 'PartiallyPaid' | 'Paid';

  @ManyToOne(() => User, (user) => user.loans, { onDelete: 'CASCADE', eager: true })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

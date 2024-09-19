import { Entity, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Beneficiary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nameInBank: string;

  @ManyToOne(() => User, user => user)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  bankAccountNumber: string;

  @Column()
  ifscCode: string;
}

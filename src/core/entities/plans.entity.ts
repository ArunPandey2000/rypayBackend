import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PlanLimit } from "./plan-limit.entity";

@Entity('plans')
export class Plan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column('decimal', { precision: 10, scale: 2, transformer: {
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value), 
  } })
  price: number;

  @Column({nullable: true})
  duration: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @OneToMany(() => PlanLimit, (planLimit) => planLimit.plan, { cascade: true })
  limits: PlanLimit[];
}
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('subscriptions')
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column('uuid')
  plan_id: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  status: string; // Active, Expired, etc.

  @Column()
  is_current: boolean;
}
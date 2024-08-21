import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class KitNumber {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  kitNumber: string;

  @Column()
  lastFourDigits: string;

  @Column({ default: false })
  isAssigned: boolean;

  @Column({ nullable: true })
  assignedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

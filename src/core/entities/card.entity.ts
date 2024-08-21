import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { KitNumber } from "./kit-number.entity";

export enum CardStatus {
    InActive = 'inactive',
    Active = 'active',
    Locked = 'locked'
}

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.card)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ nullable: true })
  cardNumber: string;

  @OneToOne(() => KitNumber)
  @JoinColumn({ name: 'kitNumberId' })
  kitNumber: KitNumber;

  @Column({ nullable: true })
  lastFourDigits: string;

  @Column({ type: 'enum', enum: CardStatus,  default: CardStatus.InActive })
  status: string; // inactive, active, locked

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

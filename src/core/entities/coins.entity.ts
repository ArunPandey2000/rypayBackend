import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('coin_transactions')
export class CoinTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal' })
  coinAmount: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.coinTransactions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', nullable: true })
  redemptionValue: number;

  @Column({ type: 'varchar', nullable: true })
  mainWalletTransactionId: string; // Reference to the main wallet transaction

  @Column({ default: false })
  isExpired: boolean;
}

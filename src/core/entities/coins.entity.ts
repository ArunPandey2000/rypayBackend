import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('coin_transactions')
export class CoinTransaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'decimal', transformer: {
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value),
  } })
  coinAmount: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.coinTransactions, { onDelete: 'CASCADE' })
  user: User;

  @Column({ type: 'decimal', nullable: true,
    transformer: {
      to: (value: number) => value, 
      from: (value: string) => parseFloat(value), 
    }
   })
  redemptionValue: number;

  @Column({ type: 'varchar', nullable: true })
  mainWalletTransactionId: string; // Reference to the main wallet transaction

  @Column({ default: false })
  isExpired: boolean;
}

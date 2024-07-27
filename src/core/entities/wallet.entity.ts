import {
  Check,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { WalletStatus } from '../enum/wallet-status.enum';
import { User } from './user.entity';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  @Check('balance >= 0')
  balance: number;

  @Column({ enum: Object.values(WalletStatus), default: WalletStatus.ACTIVE })
  status: string;

  @Column()
  walletAccountNo: string;

  @OneToOne(() => User, { eager: true })
  @JoinColumn()
  user: User;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}

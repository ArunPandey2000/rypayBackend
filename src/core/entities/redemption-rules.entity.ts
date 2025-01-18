import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('redemption_rules')
export class RedemptionRule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'decimal' })
  requiredCoins: number;

  @Column({ type: 'decimal' })
  redemptionValue: number;
}

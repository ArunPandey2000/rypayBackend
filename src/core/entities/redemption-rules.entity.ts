import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('redemption_rules')
export class RedemptionRule {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'decimal', transformer: {
    to: (value: number) => value, 
    from: (value: string) => parseFloat(value),
  } })
  requiredCoins: number;

  @Column({ type: 'decimal',
    transformer: {
      to: (value: number) => value, 
      from: (value: string) => parseFloat(value),
    }
   })
  redemptionValue: number;
}

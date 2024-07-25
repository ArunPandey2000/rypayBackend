import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'refresh_tokens' })
export class RefreshToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({
    name: 'expiredAt',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  expiredAt: Date;

  @Column({ name: 'is_revoked', type: 'boolean' })
  isRevoked: boolean;
}

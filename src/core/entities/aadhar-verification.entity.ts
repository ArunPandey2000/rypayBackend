import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('aadhar_responses')
export class AadharResponse {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({type: 'varchar'})
  aadharNumber: string

  @Column({ type: 'jsonb', nullable: true })
  aadharResponse: Record<string, any>;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

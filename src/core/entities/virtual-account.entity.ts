// src/virtual-account/entities/virtual-account.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('virtual_accounts')
export class VirtualAccount {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;


    @Column({ unique: true })
    accountId: string;

    @Column()
    accountNumber: string;

    @Column()
    ifscCode: string;

    @Column({ default: 'ACTIVE' })
    status: string;

    @CreateDateColumn({ type: 'timestamp' })
    createOn: Date;

    @Column()
    userId: string;
}

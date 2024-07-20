import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Address {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'address' })
    address1: string;

    @Column({ name: 'address' })
    address2: string;

    @Column({ name: 'city' })
    city: string;

    @Column({ name: 'state' })
    state: string;

    @Column({ name: 'pincode' })
    pincode: string;

    @Column({ name: 'created_by' })
    createdBy: string;

    @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;
}

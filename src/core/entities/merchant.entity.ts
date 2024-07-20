import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
} from 'typeorm';

@Entity({ name: 'merchants' })
export class Merchant {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'shop_name', type: 'varchar' })
    shopName: string;

    @Column({ name: 'gst_number', type: 'varchar', nullable: true })
    gstNumber: string;

    @Column({ name: 'msme_number', type: 'varchar', nullable: false })
    msmeNumber: boolean;
}

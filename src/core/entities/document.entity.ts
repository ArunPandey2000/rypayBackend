// document.entity.ts

import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'user_doc_record' })
export class Document {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({ name: 'document_type', type: 'varchar' })
    documentType: string;

    @Column({ name: 'document_path', type: 'varchar' })
    documentUrl: string;

    @Column({ name: 'description', type: 'text' })
    description: string;

    @Column({ name: 'created_date', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdDate: Date;

    @ManyToOne(() => User, (user) => user.documents)
    @JoinColumn({ name: 'user_id' })
    user: User;
}

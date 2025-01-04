import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1726325508477 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

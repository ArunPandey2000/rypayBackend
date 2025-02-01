import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1724781008253 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

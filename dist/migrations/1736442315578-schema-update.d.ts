import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1736442315578 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1737296532016 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

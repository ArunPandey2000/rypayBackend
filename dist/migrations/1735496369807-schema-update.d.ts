import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1735496369807 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

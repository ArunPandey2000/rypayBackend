import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1737207141093 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

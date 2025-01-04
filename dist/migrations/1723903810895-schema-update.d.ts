import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1723903810895 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1735376391636 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

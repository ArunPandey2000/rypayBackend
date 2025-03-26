import { MigrationInterface, QueryRunner } from "typeorm";
export declare class SchemaUpdate1743014256096 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}

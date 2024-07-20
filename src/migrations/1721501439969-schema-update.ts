import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1721501439969 implements MigrationInterface {
    name = 'SchemaUpdate1721501439969'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "created_by"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "created_by" character varying NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1727604852124 implements MigrationInterface {
    name = 'SchemaUpdate1727604852124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileIcon" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileIcon"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1735833402291 implements MigrationInterface {
    name = 'SchemaUpdate1735833402291'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "isBlocked" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBlocked"`);
    }

}

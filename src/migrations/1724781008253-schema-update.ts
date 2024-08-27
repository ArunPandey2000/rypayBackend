import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1724781008253 implements MigrationInterface {
    name = 'SchemaUpdate1724781008253'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user-session" character varying DEFAULT 'YES'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user-session"`);
    }

}

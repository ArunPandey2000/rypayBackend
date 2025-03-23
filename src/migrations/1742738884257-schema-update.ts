import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1742738884257 implements MigrationInterface {
    name = 'SchemaUpdate1742738884257'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "staticQR" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "staticQR"`);
    }

}

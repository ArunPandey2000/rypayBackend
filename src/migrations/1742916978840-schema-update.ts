import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1742916978840 implements MigrationInterface {
    name = 'SchemaUpdate1742916978840'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "merchantPartnerId" character varying`);
        await queryRunner.query(`ALTER TABLE "merchants" ALTER COLUMN "msme_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "pan_number" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "pan_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchants" ALTER COLUMN "msme_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "merchantPartnerId"`);
    }

}

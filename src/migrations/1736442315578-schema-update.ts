import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1736442315578 implements MigrationInterface {
    name = 'SchemaUpdate1736442315578'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "respectiveUserName" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ifsc_number" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "account_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ifsc_number"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "respectiveUserName"`);
    }

}

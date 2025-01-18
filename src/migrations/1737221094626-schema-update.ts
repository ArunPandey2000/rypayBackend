import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1737221094626 implements MigrationInterface {
    name = 'SchemaUpdate1737221094626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coin_transactions" ADD "isExpired" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coin_transactions" DROP COLUMN "isExpired"`);
    }

}

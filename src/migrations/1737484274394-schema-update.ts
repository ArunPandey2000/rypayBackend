import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1737484274394 implements MigrationInterface {
    name = 'SchemaUpdate1737484274394'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletBalanceBefore"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletBalanceBefore" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletBalanceBefore"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletBalanceBefore" integer NOT NULL`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1724490508493 implements MigrationInterface {
    name = 'SchemaUpdate1724490508493'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "pin" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pin"`);
    }

}

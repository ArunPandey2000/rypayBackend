import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1735376391636 implements MigrationInterface {
    name = 'SchemaUpdate1735376391636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "user-devices" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user-devices"`);
    }

}

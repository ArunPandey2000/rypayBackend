import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1737793309998 implements MigrationInterface {
    name = 'SchemaUpdate1737793309998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_aadhar_verified"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_aadhar_verified" boolean NOT NULL DEFAULT false`);
    }

}

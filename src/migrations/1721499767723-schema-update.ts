import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1721499767723 implements MigrationInterface {
    name = 'SchemaUpdate1721499767723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "token"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "aadhar_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_f2553bc3dff9fdc893e96c78b46" UNIQUE ("aadhar_number")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "pan_number" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_695f19ce860bd926335e85c3e84" UNIQUE ("pan_number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_695f19ce860bd926335e85c3e84"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pan_number"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_f2553bc3dff9fdc893e96c78b46"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "aadhar_number"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "token" character varying NOT NULL`);
    }

}

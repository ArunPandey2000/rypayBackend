import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1739634160120 implements MigrationInterface {
    name = 'SchemaUpdate1739634160120'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "created_at" DROP DEFAULT`);
    }

}

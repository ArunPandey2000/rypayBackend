import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1724490296252 implements MigrationInterface {
    name = 'SchemaUpdate1724490296252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."card_status_enum" AS ENUM('inactive', 'active', 'locked')`);
        await queryRunner.query(`ALTER TABLE "card" ADD "status" "public"."card_status_enum" NOT NULL DEFAULT 'inactive'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."card_status_enum"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "status" character varying NOT NULL DEFAULT 'inactive'`);
    }

}

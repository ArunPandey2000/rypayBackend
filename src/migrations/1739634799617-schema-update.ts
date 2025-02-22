import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1739634799617 implements MigrationInterface {
    name = 'SchemaUpdate1739634799617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "duration" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "duration" SET NOT NULL`);
    }

}

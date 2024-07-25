import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1721501807637 implements MigrationInterface {
  name = 'SchemaUpdate1721501807637';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "status"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ADD "status" text NOT NULL`);
  }
}

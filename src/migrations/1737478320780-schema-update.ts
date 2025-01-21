import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1737478320780 implements MigrationInterface {
    name = 'SchemaUpdate1737478320780'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "charges" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "charges"`);
    }

}

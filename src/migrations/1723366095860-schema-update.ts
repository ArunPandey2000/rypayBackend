import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1723366095860 implements MigrationInterface {
    name = 'SchemaUpdate1723366095860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_id" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id")`);
    }

}

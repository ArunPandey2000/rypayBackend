import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateOrderIdLength implements MigrationInterface {
    name = 'UpdateOrderIdLength'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" TYPE VARCHAR(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_id" TYPE VARCHAR(10)`);
    }
}

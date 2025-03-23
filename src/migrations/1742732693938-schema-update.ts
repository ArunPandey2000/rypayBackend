import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1742732693938 implements MigrationInterface {
    name = 'SchemaUpdate1742732693938'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum" RENAME TO "orders_order_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYMENT_GATEWAY', 'PAYOUT', 'UPI_PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum" USING "order_type"::"text"::"public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum_old" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYOUT', 'UPI_PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum_old" USING "order_type"::"text"::"public"."orders_order_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum_old" RENAME TO "orders_order_type_enum"`);
    }

}

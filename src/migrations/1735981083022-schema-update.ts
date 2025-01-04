import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1735981083022 implements MigrationInterface {
    name = 'SchemaUpdate1735981083022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum" RENAME TO "orders_order_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYOUT', 'UPI_PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum" USING "order_type"::"text"::"public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."busybox_webhook_responses_type_enum" RENAME TO "busybox_webhook_responses_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum" AS ENUM('KYC_EVENT', 'TRANSACTION', 'UPI', 'DEBIT', 'PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" TYPE "public"."busybox_webhook_responses_type_enum" USING "type"::"text"::"public"."busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" SET DEFAULT 'TRANSACTION'`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum_old" AS ENUM('KYC_EVENT', 'TRANSACTION', 'UPI', 'DEBIT')`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" TYPE "public"."busybox_webhook_responses_type_enum_old" USING "type"::"text"::"public"."busybox_webhook_responses_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" SET DEFAULT 'TRANSACTION'`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."busybox_webhook_responses_type_enum_old" RENAME TO "busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum_old" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum_old" USING "order_type"::"text"::"public"."orders_order_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum_old" RENAME TO "orders_order_type_enum"`);
    }

}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1735981083022 = void 0;
class SchemaUpdate1735981083022 {
    constructor() {
        this.name = 'SchemaUpdate1735981083022';
    }
    async up(queryRunner) {
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
    async down(queryRunner) {
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
exports.SchemaUpdate1735981083022 = SchemaUpdate1735981083022;
//# sourceMappingURL=1735981083022-schema-update.js.map
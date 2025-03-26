"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1743014256096 = void 0;
class SchemaUpdate1743014256096 {
    constructor() {
        this.name = 'SchemaUpdate1743014256096';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."busybox_webhook_responses_type_enum" RENAME TO "busybox_webhook_responses_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum" AS ENUM('KYC_EVENT', 'TRANSACTION', 'UPI', 'DEBIT', 'PAYOUT', 'QR_Payment')`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" TYPE "public"."busybox_webhook_responses_type_enum" USING "type"::"text"::"public"."busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" SET DEFAULT 'TRANSACTION'`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum_old" AS ENUM('KYC_EVENT', 'TRANSACTION', 'UPI', 'DEBIT', 'PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" TYPE "public"."busybox_webhook_responses_type_enum_old" USING "type"::"text"::"public"."busybox_webhook_responses_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" SET DEFAULT 'TRANSACTION'`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."busybox_webhook_responses_type_enum_old" RENAME TO "busybox_webhook_responses_type_enum"`);
    }
}
exports.SchemaUpdate1743014256096 = SchemaUpdate1743014256096;
//# sourceMappingURL=1743014256096-schema-update.js.map
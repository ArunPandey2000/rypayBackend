"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1725215030342 = void 0;
class SchemaUpdate1725215030342 {
    constructor() {
        this.name = 'SchemaUpdate1725215030342';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."busybox_webhook_responses_type_enum" RENAME TO "busybox_webhook_responses_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum" AS ENUM('KYC_EVENT', 'TRANSACTION', 'UPI', 'DEBIT')`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" TYPE "public"."busybox_webhook_responses_type_enum" USING "type"::"text"::"public"."busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" SET DEFAULT 'TRANSACTION'`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum_old" AS ENUM('KYC_EVENT', 'TRANSACTION')`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" TYPE "public"."busybox_webhook_responses_type_enum_old" USING "type"::"text"::"public"."busybox_webhook_responses_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "busybox_webhook_responses" ALTER COLUMN "type" SET DEFAULT 'TRANSACTION'`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."busybox_webhook_responses_type_enum_old" RENAME TO "busybox_webhook_responses_type_enum"`);
    }
}
exports.SchemaUpdate1725215030342 = SchemaUpdate1725215030342;
//# sourceMappingURL=1725215030342-schema-update.js.map
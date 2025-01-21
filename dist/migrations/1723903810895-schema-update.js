"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1723903810895 = void 0;
class SchemaUpdate1723903810895 {
    constructor() {
        this.name = 'SchemaUpdate1723903810895';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum" AS ENUM('KYC_EVENT', 'TRANSACTION')`);
        await queryRunner.query(`CREATE TABLE "busybox_webhook_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."busybox_webhook_responses_type_enum" NOT NULL DEFAULT 'TRANSACTION', "additionalData" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46ee80e5f5edce157bae65d6eca" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "busybox_webhook_responses"`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum"`);
    }
}
exports.SchemaUpdate1723903810895 = SchemaUpdate1723903810895;
//# sourceMappingURL=1723903810895-schema-update.js.map
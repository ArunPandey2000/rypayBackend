"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737222915143 = void 0;
class SchemaUpdate1737222915143 {
    constructor() {
        this.name = 'SchemaUpdate1737222915143';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."notification_type_enum" RENAME TO "notification_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('TRANSACTION_CREDIT', 'TRANSACTION_DEBIT', 'TRANSACTION_FAILED', 'RECHARGE_SUCCESS', 'RECHARGE_FAILED', 'ANNOUNCEMENT', 'REFERREL_BONUS', 'CASHBACK_REDEEMED', 'RYCOIN_EXPIRED')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "public"."notification_type_enum" USING "type"::"text"::"public"."notification_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum_old" AS ENUM('TRANSACTION_CREDIT', 'TRANSACTION_DEBIT', 'TRANSACTION_FAILED', 'RECHARGE_SUCCESS', 'RECHARGE_FAILED', 'ANNOUNCEMENT', 'REFERREL_BONUS', 'CASHBACK_REDEEMED')`);
        await queryRunner.query(`ALTER TABLE "notification" ALTER COLUMN "type" TYPE "public"."notification_type_enum_old" USING "type"::"text"::"public"."notification_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."notification_type_enum_old" RENAME TO "notification_type_enum"`);
    }
}
exports.SchemaUpdate1737222915143 = SchemaUpdate1737222915143;
//# sourceMappingURL=1737222915143-schema-update.js.map
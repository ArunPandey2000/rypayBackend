"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1742732956748 = void 0;
class SchemaUpdate1742732956748 {
    constructor() {
        this.name = 'SchemaUpdate1742732956748';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum" RENAME TO "orders_order_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYMENT_GATEWAY', 'PAYOUT', 'UPI_PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum" USING "order_type"::"text"::"public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum_old" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYOUT', 'UPI_PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum_old" USING "order_type"::"text"::"public"."orders_order_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum_old" RENAME TO "orders_order_type_enum"`);
    }
}
exports.SchemaUpdate1742732956748 = SchemaUpdate1742732956748;
//# sourceMappingURL=1742732956748-schema-update.js.map
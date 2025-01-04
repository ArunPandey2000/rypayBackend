"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1725557716511 = void 0;
class SchemaUpdate1725557716511 {
    constructor() {
        this.name = 'SchemaUpdate1725557716511';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum" RENAME TO "orders_order_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT', 'PAYOUT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum" USING "order_type"::"text"::"public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum_old"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum_old" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT')`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" TYPE "public"."orders_order_type_enum_old" USING "order_type"::"text"::"public"."orders_order_type_enum_old"`);
        await queryRunner.query(`ALTER TABLE "orders" ALTER COLUMN "order_type" SET DEFAULT 'RECHARGE'`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."orders_order_type_enum_old" RENAME TO "orders_order_type_enum"`);
    }
}
exports.SchemaUpdate1725557716511 = SchemaUpdate1725557716511;
//# sourceMappingURL=1725557716511-schema-update.js.map
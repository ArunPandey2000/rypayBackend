"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1736442315578 = void 0;
class SchemaUpdate1736442315578 {
    constructor() {
        this.name = 'SchemaUpdate1736442315578';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ADD "respectiveUserName" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "ifsc_number" character varying`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "account_id" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "account_id"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "ifsc_number"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "respectiveUserName"`);
    }
}
exports.SchemaUpdate1736442315578 = SchemaUpdate1736442315578;
//# sourceMappingURL=1736442315578-schema-update.js.map
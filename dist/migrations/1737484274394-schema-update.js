"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737484274394 = void 0;
class SchemaUpdate1737484274394 {
    constructor() {
        this.name = 'SchemaUpdate1737484274394';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletBalanceBefore"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletBalanceBefore" numeric`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletBalanceBefore"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletBalanceBefore" integer NOT NULL`);
    }
}
exports.SchemaUpdate1737484274394 = SchemaUpdate1737484274394;
//# sourceMappingURL=1737484274394-schema-update.js.map
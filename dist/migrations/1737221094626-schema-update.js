"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737221094626 = void 0;
class SchemaUpdate1737221094626 {
    constructor() {
        this.name = 'SchemaUpdate1737221094626';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coin_transactions" ADD "isExpired" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coin_transactions" DROP COLUMN "isExpired"`);
    }
}
exports.SchemaUpdate1737221094626 = SchemaUpdate1737221094626;
//# sourceMappingURL=1737221094626-schema-update.js.map
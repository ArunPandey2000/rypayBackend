"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1742738884257 = void 0;
class SchemaUpdate1742738884257 {
    constructor() {
        this.name = 'SchemaUpdate1742738884257';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "staticQR" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "staticQR"`);
    }
}
exports.SchemaUpdate1742738884257 = SchemaUpdate1742738884257;
//# sourceMappingURL=1742738884257-schema-update.js.map
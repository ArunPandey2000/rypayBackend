"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1724490508493 = void 0;
class SchemaUpdate1724490508493 {
    constructor() {
        this.name = 'SchemaUpdate1724490508493';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "pin" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "pin"`);
    }
}
exports.SchemaUpdate1724490508493 = SchemaUpdate1724490508493;
//# sourceMappingURL=1724490508493-schema-update.js.map
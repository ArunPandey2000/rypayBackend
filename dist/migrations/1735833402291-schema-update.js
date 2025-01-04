"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1735833402291 = void 0;
class SchemaUpdate1735833402291 {
    constructor() {
        this.name = 'SchemaUpdate1735833402291';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "isBlocked" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "isBlocked"`);
    }
}
exports.SchemaUpdate1735833402291 = SchemaUpdate1735833402291;
//# sourceMappingURL=1735833402291-schema-update.js.map
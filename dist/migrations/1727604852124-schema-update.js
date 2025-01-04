"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1727604852124 = void 0;
class SchemaUpdate1727604852124 {
    constructor() {
        this.name = 'SchemaUpdate1727604852124';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "profileIcon" character varying`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "profileIcon"`);
    }
}
exports.SchemaUpdate1727604852124 = SchemaUpdate1727604852124;
//# sourceMappingURL=1727604852124-schema-update.js.map
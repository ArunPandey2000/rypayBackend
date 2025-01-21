"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737478320780 = void 0;
class SchemaUpdate1737478320780 {
    constructor() {
        this.name = 'SchemaUpdate1737478320780';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" ADD "charges" integer`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "charges"`);
    }
}
exports.SchemaUpdate1737478320780 = SchemaUpdate1737478320780;
//# sourceMappingURL=1737478320780-schema-update.js.map
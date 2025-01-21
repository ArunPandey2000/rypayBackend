"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1724781008253 = void 0;
class SchemaUpdate1724781008253 {
    constructor() {
        this.name = 'SchemaUpdate1724781008253';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "user-session" character varying DEFAULT 'YES'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user-session"`);
    }
}
exports.SchemaUpdate1724781008253 = SchemaUpdate1724781008253;
//# sourceMappingURL=1724781008253-schema-update.js.map
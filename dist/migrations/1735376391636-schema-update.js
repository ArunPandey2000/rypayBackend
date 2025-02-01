"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1735376391636 = void 0;
class SchemaUpdate1735376391636 {
    constructor() {
        this.name = 'SchemaUpdate1735376391636';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "user-devices" text array`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "user-devices"`);
    }
}
exports.SchemaUpdate1735376391636 = SchemaUpdate1735376391636;
//# sourceMappingURL=1735376391636-schema-update.js.map
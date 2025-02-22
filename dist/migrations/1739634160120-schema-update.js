"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1739634160120 = void 0;
class SchemaUpdate1739634160120 {
    constructor() {
        this.name = 'SchemaUpdate1739634160120';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "created_at" SET DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "updated_at" SET DEFAULT now()`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "updated_at" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "created_at" DROP DEFAULT`);
    }
}
exports.SchemaUpdate1739634160120 = SchemaUpdate1739634160120;
//# sourceMappingURL=1739634160120-schema-update.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1739634799617 = void 0;
class SchemaUpdate1739634799617 {
    constructor() {
        this.name = 'SchemaUpdate1739634799617';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "duration" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "plans" ALTER COLUMN "duration" SET NOT NULL`);
    }
}
exports.SchemaUpdate1739634799617 = SchemaUpdate1739634799617;
//# sourceMappingURL=1739634799617-schema-update.js.map
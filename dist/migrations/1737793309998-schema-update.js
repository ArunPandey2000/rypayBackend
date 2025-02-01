"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737793309998 = void 0;
class SchemaUpdate1737793309998 {
    constructor() {
        this.name = 'SchemaUpdate1737793309998';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_aadhar_verified"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "is_aadhar_verified" boolean NOT NULL DEFAULT false`);
    }
}
exports.SchemaUpdate1737793309998 = SchemaUpdate1737793309998;
//# sourceMappingURL=1737793309998-schema-update.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1724490296252 = void 0;
class SchemaUpdate1724490296252 {
    constructor() {
        this.name = 'SchemaUpdate1724490296252';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "status"`);
        await queryRunner.query(`CREATE TYPE "public"."card_status_enum" AS ENUM('inactive', 'active', 'locked')`);
        await queryRunner.query(`ALTER TABLE "card" ADD "status" "public"."card_status_enum" NOT NULL DEFAULT 'inactive'`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "card" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."card_status_enum"`);
        await queryRunner.query(`ALTER TABLE "card" ADD "status" character varying NOT NULL DEFAULT 'inactive'`);
    }
}
exports.SchemaUpdate1724490296252 = SchemaUpdate1724490296252;
//# sourceMappingURL=1724490296252-schema-update.js.map
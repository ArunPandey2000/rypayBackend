"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1742916978840 = void 0;
class SchemaUpdate1742916978840 {
    constructor() {
        this.name = 'SchemaUpdate1742916978840';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "merchantPartnerId" character varying`);
        await queryRunner.query(`ALTER TABLE "merchants" ALTER COLUMN "msme_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "pan_number" DROP NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "pan_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "merchants" ALTER COLUMN "msme_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "merchantPartnerId"`);
    }
}
exports.SchemaUpdate1742916978840 = SchemaUpdate1742916978840;
//# sourceMappingURL=1742916978840-schema-update.js.map
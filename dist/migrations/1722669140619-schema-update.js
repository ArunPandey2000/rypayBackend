"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1722669140619 = void 0;
class SchemaUpdate1722669140619 {
    constructor() {
        this.name = 'SchemaUpdate1722669140619';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "CHK_e3419b9528181508093ec861bf"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "service_used" character varying`);
        await queryRunner.query(`UPDATE "transactions" SET "service_used" = 'WALLET' WHERE "service_used" IS NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "service_used" SET NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "service_used"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "service_used" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "service_used" TO "balance"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "CHK_e3419b9528181508093ec861bf" CHECK ((balance >= 0))`);
    }
}
exports.SchemaUpdate1722669140619 = SchemaUpdate1722669140619;
//# sourceMappingURL=1722669140619-schema-update.js.map
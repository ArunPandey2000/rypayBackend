"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737296532016 = void 0;
class SchemaUpdate1737296532016 {
    constructor() {
        this.name = 'SchemaUpdate1737296532016';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "aadhar_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "aadharNumber" character varying NOT NULL, "aadharResponse" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3e1c0bc0d6da6987c2ecba63555" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "is_aadhar_verified" boolean NOT NULL DEFAULT false`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "is_aadhar_verified"`);
        await queryRunner.query(`DROP TABLE "aadhar_responses"`);
    }
}
exports.SchemaUpdate1737296532016 = SchemaUpdate1737296532016;
//# sourceMappingURL=1737296532016-schema-update.js.map
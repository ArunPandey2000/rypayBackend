"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1733245642557 = void 0;
class SchemaUpdate1733245642557 {
    constructor() {
        this.name = 'SchemaUpdate1733245642557';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."loans_loanstatus_enum" AS ENUM('Pending', 'PartiallyPaid', 'Paid')`);
        await queryRunner.query(`CREATE TABLE "loans" ("id" SERIAL NOT NULL, "loanId" character varying NOT NULL, "name" character varying NOT NULL, "installmentAmount" numeric(10,2) NOT NULL, "overdueAmount" numeric(10,2) NOT NULL DEFAULT '0', "totalAmount" numeric(10,2) NOT NULL, "paidAmount" numeric(10,2) NOT NULL DEFAULT '0', "loanStatus" "public"."loans_loanstatus_enum" NOT NULL DEFAULT 'Pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_a2c2404ce9ca3864bac9fde4139" UNIQUE ("loanId"), CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_4c2ab4e556520045a2285916d45" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_4c2ab4e556520045a2285916d45"`);
        await queryRunner.query(`DROP TABLE "loans"`);
        await queryRunner.query(`DROP TYPE "public"."loans_loanstatus_enum"`);
    }
}
exports.SchemaUpdate1733245642557 = SchemaUpdate1733245642557;
//# sourceMappingURL=1733245642557-schema-update.js.map
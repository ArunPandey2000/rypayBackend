"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1735321562405 = void 0;
class SchemaUpdate1735321562405 {
    constructor() {
        this.name = 'SchemaUpdate1735321562405';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TYPE "public"."moneyRequest_status_enum" AS ENUM('Requested', 'Rejected', 'Paid')`);
        await queryRunner.query(`CREATE TABLE "moneyRequest" ("id" SERIAL NOT NULL, "paidAt" TIMESTAMP NOT NULL, "modeOfPayment" character varying NOT NULL, "UTR" character varying NOT NULL, "paidAmount" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."moneyRequest_status_enum" NOT NULL DEFAULT 'Requested', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "UQ_b82def6160254d45a7a06296fe2" UNIQUE ("UTR"), CONSTRAINT "PK_35eb8b1cb8711b4863ebe26e4f1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "moneyRequest" ADD CONSTRAINT "FK_a9710e6e0e4cd3f480388974a31" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "moneyRequest" DROP CONSTRAINT "FK_a9710e6e0e4cd3f480388974a31"`);
        await queryRunner.query(`DROP TABLE "moneyRequest"`);
        await queryRunner.query(`DROP TYPE "public"."moneyRequest_status_enum"`);
    }
}
exports.SchemaUpdate1735321562405 = SchemaUpdate1735321562405;
//# sourceMappingURL=1735321562405-schema-update.js.map
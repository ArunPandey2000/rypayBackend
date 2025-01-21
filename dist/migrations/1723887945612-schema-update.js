"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1723887945612 = void 0;
class SchemaUpdate1723887945612 {
    constructor() {
        this.name = 'SchemaUpdate1723887945612';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "kit_number" ("id" SERIAL NOT NULL, "kitNumber" character varying NOT NULL, "lastFourDigits" character varying NOT NULL, "isAssigned" boolean NOT NULL DEFAULT false, "assignedAt" TIMESTAMP, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_62976649aeceef5a6af0c521a52" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "card" ("id" SERIAL NOT NULL, "cardNumber" character varying, "lastFourDigits" character varying, "status" character varying NOT NULL DEFAULT 'inactive', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, "kitNumberId" integer, CONSTRAINT "REL_77d7cc9d95dccd574d71ba221b" UNIQUE ("userId"), CONSTRAINT "REL_321fd68acaeec9bc9fb3fbb52c" UNIQUE ("kitNumberId"), CONSTRAINT "PK_9451069b6f1199730791a7f4ae4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "card" ADD CONSTRAINT "FK_321fd68acaeec9bc9fb3fbb52c7" FOREIGN KEY ("kitNumberId") REFERENCES "kit_number"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_321fd68acaeec9bc9fb3fbb52c7"`);
        await queryRunner.query(`ALTER TABLE "card" DROP CONSTRAINT "FK_77d7cc9d95dccd574d71ba221b0"`);
        await queryRunner.query(`DROP TABLE "card"`);
        await queryRunner.query(`DROP TABLE "kit_number"`);
    }
}
exports.SchemaUpdate1723887945612 = SchemaUpdate1723887945612;
//# sourceMappingURL=1723887945612-schema-update.js.map
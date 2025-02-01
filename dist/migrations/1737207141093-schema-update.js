"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737207141093 = void 0;
class SchemaUpdate1737207141093 {
    constructor() {
        this.name = 'SchemaUpdate1737207141093';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "redemption_rules" ("id" SERIAL NOT NULL, "requiredCoins" numeric NOT NULL, "redemptionValue" numeric NOT NULL, CONSTRAINT "PK_fe24cb7cb9fb9cdac48a01b23db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "coin_transactions" ("id" SERIAL NOT NULL, "coinAmount" numeric NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "redemptionValue" numeric, "mainWalletTransactionId" character varying, "userId" integer, CONSTRAINT "PK_7dad7cc20e8e6f4700b04928e12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coin_transactions" ADD CONSTRAINT "FK_9332e2b867f91fba0642b781af8" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coin_transactions" DROP CONSTRAINT "FK_9332e2b867f91fba0642b781af8"`);
        await queryRunner.query(`DROP TABLE "coin_transactions"`);
        await queryRunner.query(`DROP TABLE "redemption_rules"`);
    }
}
exports.SchemaUpdate1737207141093 = SchemaUpdate1737207141093;
//# sourceMappingURL=1737207141093-schema-update.js.map
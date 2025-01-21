"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1737482430119 = void 0;
class SchemaUpdate1737482430119 {
    constructor() {
        this.name = 'SchemaUpdate1737482430119';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "CHK_6ca587ddb2f9f8efc78a14c66a"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "balance" numeric NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletBalanceAfter"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletBalanceAfter" numeric`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount" numeric`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "CHK_6ca587ddb2f9f8efc78a14c66a" CHECK (balance >= 0)`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "CHK_6ca587ddb2f9f8efc78a14c66a"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "amount"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "amount" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "walletBalanceAfter"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "walletBalanceAfter" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP COLUMN "balance"`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD "balance" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "CHK_6ca587ddb2f9f8efc78a14c66a" CHECK ((balance >= 0))`);
    }
}
exports.SchemaUpdate1737482430119 = SchemaUpdate1737482430119;
//# sourceMappingURL=1737482430119-schema-update.js.map
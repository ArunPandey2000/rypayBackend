"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1723366095860 = void 0;
class SchemaUpdate1723366095860 {
    constructor() {
        this.name = 'SchemaUpdate1723366095860';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_id" character varying(10) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id")`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "order_id"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "order_id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id")`);
    }
}
exports.SchemaUpdate1723366095860 = SchemaUpdate1723366095860;
//# sourceMappingURL=1723366095860-schema-update.js.map
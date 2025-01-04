"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1723387760735 = void 0;
class SchemaUpdate1723387760735 {
    constructor() {
        this.name = 'SchemaUpdate1723387760735';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "webhook_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "webHookOrderId" character varying(255) NOT NULL, "rypayOrderId" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, "transId" character varying(255), "additionalData" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24ba82df4f81de9f1452afb17c7" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "webhook_responses"`);
    }
}
exports.SchemaUpdate1723387760735 = SchemaUpdate1723387760735;
//# sourceMappingURL=1723387760735-schema-update.js.map
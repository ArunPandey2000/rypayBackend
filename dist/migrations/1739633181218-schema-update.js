"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1739633181218 = void 0;
class SchemaUpdate1739633181218 {
    constructor() {
        this.name = 'SchemaUpdate1739633181218';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "subscriptions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "plan_id" uuid NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "is_current" boolean NOT NULL, CONSTRAINT "PK_a87248d73155605cf782be9ee5e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "plans" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "duration" integer NOT NULL, "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_3720521a81c7c24fe9b7202ba61" PRIMARY KEY ("id"))`);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "plans"`);
        await queryRunner.query(`DROP TABLE "subscriptions"`);
    }
}
exports.SchemaUpdate1739633181218 = SchemaUpdate1739633181218;
//# sourceMappingURL=1739633181218-schema-update.js.map
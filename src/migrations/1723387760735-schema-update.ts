import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1723387760735 implements MigrationInterface {
    name = 'SchemaUpdate1723387760735'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "webhook_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "webHookOrderId" character varying(255) NOT NULL, "rypayOrderId" character varying(255) NOT NULL, "status" character varying(50) NOT NULL, "transId" character varying(255), "additionalData" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24ba82df4f81de9f1452afb17c7" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "webhook_responses"`);
    }

}

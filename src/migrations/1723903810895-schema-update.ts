import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1723903810895 implements MigrationInterface {
    name = 'SchemaUpdate1723903810895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."busybox_webhook_responses_type_enum" AS ENUM('KYC_EVENT', 'TRANSACTION')`);
        await queryRunner.query(`CREATE TABLE "busybox_webhook_responses" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "public"."busybox_webhook_responses_type_enum" NOT NULL DEFAULT 'TRANSACTION', "additionalData" jsonb, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_46ee80e5f5edce157bae65d6eca" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "busybox_webhook_responses"`);
        await queryRunner.query(`DROP TYPE "public"."busybox_webhook_responses_type_enum"`);
    }

}

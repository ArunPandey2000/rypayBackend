import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1739633799696 implements MigrationInterface {
    name = 'SchemaUpdate1739633799696'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "plan_limits" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "transactionType" character varying(50) NOT NULL, "perTransactionLimit" numeric(10,2), "dailyLimit" numeric(10,2) NOT NULL, "monthlyLimit" numeric(10,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "planId" uuid, CONSTRAINT "PK_7e1766a42b4f6a5d98a04eb4ba9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "plan_limits" ADD CONSTRAINT "FK_39d47e27a4d2bcfc4380e19bdd6" FOREIGN KEY ("planId") REFERENCES "plans"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plan_limits" DROP CONSTRAINT "FK_39d47e27a4d2bcfc4380e19bdd6"`);
        await queryRunner.query(`DROP TABLE "plan_limits"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1735496369807 implements MigrationInterface {
    name = 'SchemaUpdate1735496369807'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "loans" ("id" SERIAL NOT NULL, "loanAccount" character varying NOT NULL, "installmentAmount" numeric(10,2) NOT NULL, "overdueAmount" numeric(10,2) NOT NULL DEFAULT '0', "totalAmount" numeric(10,2) NOT NULL DEFAULT '0', "dueDate" TIMESTAMP NOT NULL DEFAULT now(), "loanStatus" "public"."loans_loanstatus_enum" NOT NULL DEFAULT 'Pending', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_5c6942c1e13e4de135c5203ee61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "loans" ADD CONSTRAINT "FK_4c2ab4e556520045a2285916d45" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "loans" DROP CONSTRAINT "FK_4c2ab4e556520045a2285916d45"`);
        await queryRunner.query(`DROP TABLE "loans"`);
    }

}

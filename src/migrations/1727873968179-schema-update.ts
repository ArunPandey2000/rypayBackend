import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1727873968179 implements MigrationInterface {
    name = 'SchemaUpdate1727873968179'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."notification_type_enum" AS ENUM('TRANSACTION_CREDIT', 'TRANSACTION_DEBIT', 'TRANSACTION_FAILED', 'RECHARGE_SUCCESS', 'RECHARGE_FAILED', 'ANNOUNCEMENT')`);
        await queryRunner.query(`CREATE TABLE "notification" ("id" SERIAL NOT NULL, "message" text NOT NULL, "type" "public"."notification_type_enum" NOT NULL, "isRead" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "PK_705b6c7cdf9b2c2ff7ac7872cb7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "notification" ADD CONSTRAINT "FK_1ced25315eb974b73391fb1c81b" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "notification" DROP CONSTRAINT "FK_1ced25315eb974b73391fb1c81b"`);
        await queryRunner.query(`DROP TABLE "notification"`);
        await queryRunner.query(`DROP TYPE "public"."notification_type_enum"`);
    }

}

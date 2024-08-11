import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1723364889496 implements MigrationInterface {
    name = 'SchemaUpdate1723364889496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."orders_order_type_enum" AS ENUM('RECHARGE', 'TRANSFER', 'PAYMENT')`);
        await queryRunner.query(`CREATE TYPE "public"."orders_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'DISPUTED')`);
        await queryRunner.query(`CREATE TABLE "orders" ("order_id" SERIAL NOT NULL, "order_type" "public"."orders_order_type_enum" NOT NULL DEFAULT 'RECHARGE', "amount" numeric(10,2) NOT NULL DEFAULT '0', "status" "public"."orders_status_enum" NOT NULL DEFAULT 'PENDING', "transaction_id" character varying(255), "payment_method" character varying(255), "gateway_response" text, "description" text, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_cad55b3cb25b38be94d2ce831db" PRIMARY KEY ("order_id"))`);
        await queryRunner.query(`CREATE TYPE "public"."transactions_status_enum" AS ENUM('PENDING', 'SUCCESS', 'FAILED', 'DISPUTED')`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "status" "public"."transactions_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_a922b820eeef29ac1c6800e826a"`);
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."transactions_status_enum"`);
        await queryRunner.query(`DROP TABLE "orders"`);
        await queryRunner.query(`DROP TYPE "public"."orders_status_enum"`);
        await queryRunner.query(`DROP TYPE "public"."orders_order_type_enum"`);
    }

}

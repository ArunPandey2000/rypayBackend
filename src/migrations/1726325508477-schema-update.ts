import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1726325508477 implements MigrationInterface {
    name = 'SchemaUpdate1726325508477'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "beneficiary" ("id" SERIAL NOT NULL, "nameInBank" character varying NOT NULL, "bankAccountNumber" character varying NOT NULL, "ifscCode" character varying NOT NULL, "user_id" integer, CONSTRAINT "PK_c7514d7fed62b8e619cb1840f41" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "beneficiary" ADD CONSTRAINT "FK_90adf4d80d9633a090e00a0b035" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "beneficiary" DROP CONSTRAINT "FK_90adf4d80d9633a090e00a0b035"`);
        await queryRunner.query(`DROP TABLE "beneficiary"`);
    }

}

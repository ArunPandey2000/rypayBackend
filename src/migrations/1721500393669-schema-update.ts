import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1721500393669 implements MigrationInterface {
    name = 'SchemaUpdate1721500393669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" SERIAL NOT NULL, "user_id" character varying NOT NULL, "expiredAt" TIMESTAMP NOT NULL DEFAULT now(), "is_revoked" boolean NOT NULL, CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
    }

}

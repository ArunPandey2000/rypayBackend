import { MigrationInterface, QueryRunner } from 'typeorm';

export class SchemaUpdate1721466568797 implements MigrationInterface {
  name = 'SchemaUpdate1721466568797';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("id" SERIAL NOT NULL, "address1" character varying NOT NULL, "address2" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "pincode" character varying NOT NULL, "created_by" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "transactions" ("id" SERIAL NOT NULL, "wallet_id" integer NOT NULL, "amount" integer NOT NULL, "description" character varying NOT NULL, "type" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "credit_type" text NOT NULL, "balance" integer NOT NULL DEFAULT '0', CONSTRAINT "CHK_e3419b9528181508093ec861bf" CHECK (balance >= 0), CONSTRAINT "PK_a219afd8dd77ed80f5a862f1db9" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "balance" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "CHK_6ca587ddb2f9f8efc78a14c66a" CHECK (balance >= 0), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "user_doc_record" ("id" SERIAL NOT NULL, "document_type" character varying NOT NULL, "document_path" character varying NOT NULL, "description" text NOT NULL, "created_date" TIMESTAMP NOT NULL DEFAULT now(), "user_id" integer, CONSTRAINT "PK_02234e390b3fc614dfcc86842f5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "merchants" ("id" SERIAL NOT NULL, "shop_name" character varying NOT NULL, "gst_number" character varying, "msme_number" character varying NOT NULL, CONSTRAINT "PK_4fd312ef25f8e05ad47bfe7ed25" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "is_kyc_verified" smallint NOT NULL DEFAULT '0', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dob" character varying NOT NULL, "token" character varying NOT NULL, "role" character varying NOT NULL, "status" text NOT NULL, "walletId" integer, "address_id" integer, "merchant_id" integer, CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "REL_0a95e6aab86ff1b0278c18cf48" UNIQUE ("walletId"), CONSTRAINT "REL_1b05689f6b6456680d538c3d2e" UNIQUE ("address_id"), CONSTRAINT "REL_fe996f039efa99e46d75761aad" UNIQUE ("merchant_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "otp_info" ("id" SERIAL NOT NULL, "phone_number" character varying NOT NULL, "otp_value" character varying NOT NULL, "generated_time" TIMESTAMP NOT NULL DEFAULT now(), "expiry_time" TIMESTAMP NOT NULL DEFAULT now(), "is_used" boolean NOT NULL DEFAULT false, CONSTRAINT "PK_b2b5b2976e1510a84b1ddedde9f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" ADD CONSTRAINT "FK_0b171330be0cb621f8d73b87a9e" FOREIGN KEY ("wallet_id") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_doc_record" ADD CONSTRAINT "FK_b6ca1bc44079faa03d590f304dd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e" FOREIGN KEY ("walletId") REFERENCES "wallet"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_fe996f039efa99e46d75761aad0" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_fe996f039efa99e46d75761aad0"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_0a95e6aab86ff1b0278c18cf48e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user_doc_record" DROP CONSTRAINT "FK_b6ca1bc44079faa03d590f304dd"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transactions" DROP CONSTRAINT "FK_0b171330be0cb621f8d73b87a9e"`,
    );
    await queryRunner.query(`DROP TABLE "otp_info"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "merchants"`);
    await queryRunner.query(`DROP TABLE "user_doc_record"`);
    await queryRunner.query(`DROP TABLE "wallet"`);
    await queryRunner.query(`DROP TABLE "transactions"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}

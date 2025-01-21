"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaUpdate1722076935782 = void 0;
class SchemaUpdate1722076935782 {
    constructor() {
        this.name = 'SchemaUpdate1722076935782';
    }
    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "phone_number" character varying NOT NULL, "aadhar_number" character varying NOT NULL, "pan_number" character varying NOT NULL, "is_kyc_verified" smallint NOT NULL DEFAULT '0', "gender" character NOT NULL DEFAULT 'M', "card_holder_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "dob" character varying NOT NULL, "role" character varying NOT NULL, "address_id" integer, "merchant_id" integer, CONSTRAINT "UQ_17d1817f241f10a3dbafb169fd2" UNIQUE ("phone_number"), CONSTRAINT "UQ_f2553bc3dff9fdc893e96c78b46" UNIQUE ("aadhar_number"), CONSTRAINT "UQ_695f19ce860bd926335e85c3e84" UNIQUE ("pan_number"), CONSTRAINT "UQ_0327549f1d5b1f0b8cea7f71115" UNIQUE ("card_holder_id"), CONSTRAINT "REL_1b05689f6b6456680d538c3d2e" UNIQUE ("address_id"), CONSTRAINT "REL_fe996f039efa99e46d75761aad" UNIQUE ("merchant_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "balance" integer NOT NULL DEFAULT '0', "status" character varying NOT NULL DEFAULT 'active', "walletAccountNo" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" integer, CONSTRAINT "REL_35472b1fe48b6330cd34970956" UNIQUE ("userId"), CONSTRAINT "CHK_6ca587ddb2f9f8efc78a14c66a" CHECK (balance >= 0), CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_doc_record" ADD CONSTRAINT "FK_b6ca1bc44079faa03d590f304dd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea" FOREIGN KEY ("address_id") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_fe996f039efa99e46d75761aad0" FOREIGN KEY ("merchant_id") REFERENCES "merchants"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "FK_6bb58f2b6e30cb51a6504599f41"`);
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_fe996f039efa99e46d75761aad0"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_1b05689f6b6456680d538c3d2ea"`);
        await queryRunner.query(`ALTER TABLE "user_doc_record" DROP CONSTRAINT "FK_b6ca1bc44079faa03d590f304dd"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }
}
exports.SchemaUpdate1722076935782 = SchemaUpdate1722076935782;
//# sourceMappingURL=1722076935782-schema-update.js.map
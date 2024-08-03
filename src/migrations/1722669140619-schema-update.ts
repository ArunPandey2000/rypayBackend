import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1722669140619 implements MigrationInterface {
    name = 'SchemaUpdate1722669140619'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Drop the constraint
        await queryRunner.query(`ALTER TABLE "transactions" DROP CONSTRAINT "CHK_e3419b9528181508093ec861bf"`);
    
        // Drop the old column
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "balance"`);
    
        // Add the new column without the NOT NULL constraint
        await queryRunner.query(`ALTER TABLE "transactions" ADD "service_used" character varying`);
    
        // Update the new column to set default value for existing NULLs
        await queryRunner.query(`UPDATE "transactions" SET "service_used" = 'WALLET' WHERE "service_used" IS NULL`);
    
        // Alter the column to add the NOT NULL constraint
        await queryRunner.query(`ALTER TABLE "transactions" ALTER COLUMN "service_used" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "transactions" DROP COLUMN "service_used"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD "service_used" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "transactions" RENAME COLUMN "service_used" TO "balance"`);
        await queryRunner.query(`ALTER TABLE "transactions" ADD CONSTRAINT "CHK_e3419b9528181508093ec861bf" CHECK ((balance >= 0))`);
    }

}

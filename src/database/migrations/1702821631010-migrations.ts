import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702821631010 implements MigrationInterface {
    name = 'Migrations1702821631010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "region" TO "region_id"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "region_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "region_id" uuid`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_68c168fe38b5826502b831f9f83" FOREIGN KEY ("region_id") REFERENCES "region"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_68c168fe38b5826502b831f9f83"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "region_id"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "region_id" character varying`);
        await queryRunner.query(`ALTER TABLE "user" RENAME COLUMN "region_id" TO "region"`);
    }

}

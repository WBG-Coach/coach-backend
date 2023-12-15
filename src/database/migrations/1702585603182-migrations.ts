import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1702585603182 implements MigrationInterface {
    name = 'Migrations1702585603182'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "nsleft"`);
        await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "nsright"`);
        await queryRunner.query(`ALTER TABLE "region" ADD "mpath" character varying DEFAULT ''`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "region" DROP COLUMN "mpath"`);
        await queryRunner.query(`ALTER TABLE "region" ADD "nsright" integer NOT NULL DEFAULT '2'`);
        await queryRunner.query(`ALTER TABLE "region" ADD "nsleft" integer NOT NULL DEFAULT '1'`);
    }

}

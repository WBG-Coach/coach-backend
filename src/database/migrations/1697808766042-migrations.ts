import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1697808766042 implements MigrationInterface {
    name = 'migrations1697808766042'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" ADD "district" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "region" character varying`);
        await queryRunner.query(`ALTER TABLE "user" ADD "district" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "region"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "district"`);
    }

}

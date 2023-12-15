import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1702576018916 implements MigrationInterface {
    name = 'migrations1702576018916'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "region_old"`);
        await queryRunner.query(`ALTER TABLE "school" DROP COLUMN "district"`);
        await queryRunner.query(`ALTER TABLE "school" ADD CONSTRAINT "UQ_28c6ececc2150cbf3556c170c14" UNIQUE ("emis_number")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "school" DROP CONSTRAINT "UQ_28c6ececc2150cbf3556c170c14"`);
        await queryRunner.query(`ALTER TABLE "school" ADD "district" character varying`);
        await queryRunner.query(`ALTER TABLE "school" ADD "region_old" character varying`);
    }

}

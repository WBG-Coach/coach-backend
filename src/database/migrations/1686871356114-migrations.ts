import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1686871356114 implements MigrationInterface {
    name = 'migrations1686871356114'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "emis_number"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "emis_number"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" ADD "emis_number" character varying`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "emis_number" character varying`);
    }

}

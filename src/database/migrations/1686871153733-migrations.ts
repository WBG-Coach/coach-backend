import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1686871153733 implements MigrationInterface {
    name = 'migrations1686871153733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "boys_count"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "girls_count"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "surname" character varying`);
        await queryRunner.query(`ALTER TABLE "session" ADD "students_count" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "students_count"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "surname"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "girls_count" character varying`);
        await queryRunner.query(`ALTER TABLE "session" ADD "boys_count" character varying`);
    }

}

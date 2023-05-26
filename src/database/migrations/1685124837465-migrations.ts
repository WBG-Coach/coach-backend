import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1685124837465 implements MigrationInterface {
    name = 'migrations1685124837465'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "value" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "answer" ADD "value" character varying`);
    }

}

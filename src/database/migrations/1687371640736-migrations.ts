import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1687371640736 implements MigrationInterface {
    name = 'migrations1687371640736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "latitude" double precision`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "longitude" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "longitude" integer`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "session" ADD "latitude" integer`);
    }

}

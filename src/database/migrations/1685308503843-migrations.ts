import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1685308503843 implements MigrationInterface {
    name = 'migrations1685308503843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "session" ADD "latitude" integer`);
        await queryRunner.query(`ALTER TABLE "session" ADD "longitude" integer`);
        await queryRunner.query(`ALTER TABLE "sync" ADD "latitude" integer`);
        await queryRunner.query(`ALTER TABLE "sync" ADD "longitude" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "sync" DROP COLUMN "latitude"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "latitude"`);
    }

}

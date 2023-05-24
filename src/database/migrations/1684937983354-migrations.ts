import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1684937983354 implements MigrationInterface {
    name = 'migrations1684937983354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" RENAME COLUMN "data" TO "value"`);
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "value" character varying(100000)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "value" character varying`);
        await queryRunner.query(`ALTER TABLE "image" RENAME COLUMN "value" TO "data"`);
    }

}

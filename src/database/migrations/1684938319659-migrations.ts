import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1684938319659 implements MigrationInterface {
    name = 'migrations1684938319659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "value" character varying(1000000)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "value"`);
        await queryRunner.query(`ALTER TABLE "image" ADD "value" character varying(100000)`);
    }

}

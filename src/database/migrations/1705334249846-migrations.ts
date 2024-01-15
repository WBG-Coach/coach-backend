import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705334249846 implements MigrationInterface {
    name = 'Migrations1705334249846'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "password" character varying`);
    }

}

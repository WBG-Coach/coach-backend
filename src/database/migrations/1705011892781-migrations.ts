import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705011892781 implements MigrationInterface {
    name = 'Migrations1705011892781'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" ADD "email" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "phone" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "email"`);
    }

}

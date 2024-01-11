import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1705016846573 implements MigrationInterface {
    name = 'Migrations1705016846573'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" integer NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "otp" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "otp" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
    }

}

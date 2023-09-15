import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1694809456691 implements MigrationInterface {
    name = 'migrations1694809456691'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" ADD "birthdate" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "birthdate"`);
    }

}

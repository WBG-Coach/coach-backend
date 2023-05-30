import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1685476818189 implements MigrationInterface {
    name = 'migrations1685476818189'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" ADD "external_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "image" DROP COLUMN "external_id"`);
    }

}

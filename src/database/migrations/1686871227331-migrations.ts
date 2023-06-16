import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1686871227331 implements MigrationInterface {
    name = 'migrations1686871227331'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" ADD "emis_number" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "emis_number"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1686872601850 implements MigrationInterface {
    name = 'migrations1686872601850'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" ADD "scale" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "question" DROP COLUMN "scale"`);
    }

}

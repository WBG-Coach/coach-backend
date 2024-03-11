import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1707482658158 implements MigrationInterface {
    name = 'Migrations1707482658158'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach_school" DROP CONSTRAINT "PK_ab7b406da493dfc388b7dc35904"`);
        await queryRunner.query(`ALTER TABLE "coach_school" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "coach_school" ADD CONSTRAINT "PK_9508da77ee57daf0c035143d762" PRIMARY KEY ("school_id", "coach_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach_school" DROP CONSTRAINT "PK_9508da77ee57daf0c035143d762"`);
        await queryRunner.query(`ALTER TABLE "coach_school" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "coach_school" ADD CONSTRAINT "PK_ab7b406da493dfc388b7dc35904" PRIMARY KEY ("id")`);
    }

}

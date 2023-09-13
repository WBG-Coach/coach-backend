import { MigrationInterface, QueryRunner } from "typeorm";

export class migrations1694613496814 implements MigrationInterface {
    name = 'migrations1694613496814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach" DROP CONSTRAINT "FK_ab7b406da493dfc388b7dc35904"`);
        await queryRunner.query(`CREATE TABLE "coach_school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "school_id" uuid NOT NULL, "coach_id" uuid NOT NULL, "created_at" TIMESTAMP, "updated_at" TIMESTAMP, "deleted_at" TIMESTAMP, CONSTRAINT "PK_ab7b406da493dfc388b7dc35904" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "school_id"`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "pin" character varying`);
        await queryRunner.query(`ALTER TABLE "teacher" ADD "nin" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "pin" character varying`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "nin" character varying`);
        await queryRunner.query(`ALTER TABLE "coach_school" ADD CONSTRAINT "FK_82cadb6e06a1a35a5d422becf23" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "coach_school" ADD CONSTRAINT "FK_70bee80791e369b3a0c5db6dee6" FOREIGN KEY ("coach_id") REFERENCES "coach"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "coach_school" DROP CONSTRAINT "FK_70bee80791e369b3a0c5db6dee6"`);
        await queryRunner.query(`ALTER TABLE "coach_school" DROP CONSTRAINT "FK_82cadb6e06a1a35a5d422becf23"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "nin"`);
        await queryRunner.query(`ALTER TABLE "coach" DROP COLUMN "pin"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "nin"`);
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "pin"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD "school_id" uuid`);
        await queryRunner.query(`DROP TABLE "coach_school"`);
        await queryRunner.query(`ALTER TABLE "coach" ADD CONSTRAINT "FK_ab7b406da493dfc388b7dc35904" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
